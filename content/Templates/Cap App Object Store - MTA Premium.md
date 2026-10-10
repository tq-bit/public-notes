---
description: Hierbei handelt es sich um eine vollständige MTA-Variante für das Deployment einer CAP App
---
```yml
_schema-version: 3.3.0
ID: com.example.cap.myapp
version: 1.0.0
description: "CAP application: backend, UI5 frontend, PostgreSQL, object store."
parameters:
  enable-parallel-deployments: true
  deploy_mode: html5-repo
build-parameters:
  before-all:
    - builder: custom
      commands:
        - npm ci
        - npx cds build --production

modules:
  # ---------------------------------------------------------------------
  # CAP backend (OData services)
  # ---------------------------------------------------------------------
  - name: com.example.cap.myapp-srv
    type: nodejs
    path: gen/srv
    parameters:
      instances: 1
      buildpack: nodejs_buildpack
    properties:
      # secrets are NOT part of the MTA — set them after deployment:
      # cf set-env <srv-app> <SECRET_ENV> <value> && cf restart <srv-app>
    build-parameters:
      builder: npm-ci
    provides:
      - name: srv-api # required by consumers of CAP services (e.g. approuter)
        properties:
          srv-url: ${default-url}
    requires:
      - name: com.example.cap.myapp-auth
      - name: com.example.cap.myapp-postgres
      - name: com.example.cap.myapp-objectstore
      - name: com.example.cap.myapp-destination

  # ---------------------------------------------------------------------
  # Database deployer (applies the schema and db/data CSVs)
  # ---------------------------------------------------------------------
  - name: com.example.cap.myapp-postgres-deployer
    type: nodejs
    path: gen/pg
    parameters:
      buildpack: nodejs_buildpack
      no-route: true
      no-start: true
      tasks:
        - name: deploy-to-postgresql
          command: npm start
    requires:
      - name: com.example.cap.myapp-postgres

  # ---------------------------------------------------------------------
  # UI5 application build (zipped for the HTML5 Application Repository)
  # ---------------------------------------------------------------------
  - name: com.example.cap.myapp-ui
    type: html5
    path: app/myapp-ui
    build-parameters:
      build-result: dist
      builder: custom
      commands:
        - npm ci
        - npm run build
      supported-platforms:
        []

  # ---------------------------------------------------------------------
  # HTML5 Application Repository deployer (content provider)
  # ---------------------------------------------------------------------
  - name: com.example.cap.myapp-app-deployer
    type: com.sap.application.content
    path: gen
    build-parameters:
      build-result: app/
      requires:
        - name: com.example.cap.myapp-ui
          artifacts:
            - myapp-ui.zip
          target-path: app/
    requires:
      - name: com.example.cap.myapp-auth
      - name: srv-api
      - name: com.example.cap.myapp-html5-repo-host
        parameters:
          content-target: true
          config:
            HTML5Runtime_enabled: true
    parameters:
      config:
        destinations:
          - Name: srv-api
            URL: ~{srv-api/srv-url}
            Authentication: NoAuthentication
            Type: HTTP
            ProxyType: Internet
            ForwardAuthToken: true
            DynamicDestination: true

  # ---------------------------------------------------------------------
  # Standalone approuter (single user-facing entry point)
  # ---------------------------------------------------------------------
  - name: com.example.cap.myapp
    type: approuter.nodejs
    path: .deploy/app-router
    parameters:
      keep-existing-routes: true
      disk-quota: 256M
      memory: 256M
    requires:
      - name: srv-api
        group: destinations
        properties:
          name: srv-api # must be used in xs-app.json as well
          url: ~{srv-url}
          forwardAuthToken: true
      - name: com.example.cap.myapp-auth
      - name: com.example.cap.myapp-html5-runtime
      - name: com.example.cap.myapp-destination
    provides:
      - name: app-api
        properties:
          app-protocol: ${protocol}
          app-uri: ${default-uri}

  # ---------------------------------------------------------------------
  # Destination content (enables routing inside SAP Build Work Zone)
  # ---------------------------------------------------------------------
  - name: com.example.cap.myapp-destinations
    type: com.sap.application.content
    requires:
      - name: com.example.cap.myapp-auth
        parameters:
          service-key:
            name: com.example.cap.myapp-auth-key
      - name: com.example.cap.myapp-html5-repo-host
        parameters:
          service-key:
            name: com.example.cap.myapp-html5-repo-host-key
      - name: srv-api
      - name: com.example.cap.myapp-destination
        parameters:
          content-target: true
    build-parameters:
      no-source: true
    parameters:
      content:
        instance:
          existing_destinations_policy: update
          destinations:
            - Name: com.example.cap.myapp-html5-repository
              ServiceInstanceName: com.example.cap.myapp-html5-repo-host
              ServiceKeyName: com.example.cap.myapp-html5-repo-host-key
              sap.cloud.service: com.example.cap.myapp.service
            - Name: com.example.cap.myapp-auth
              Authentication: OAuth2UserTokenExchange
              ServiceInstanceName: com.example.cap.myapp-auth
              ServiceKeyName: com.example.cap.myapp-auth-key
              sap.cloud.service: com.example.cap.myapp.service

resources:
  # Shared XSUAA for backend, approuter and UI (single-tenant standard:
  # user tokens carry the backend scopes)
  - name: com.example.cap.myapp-auth
    type: org.cloudfoundry.managed-service
    parameters:
      service: xsuaa
      service-plan: application
      path: ./.deploy/xs-security.json
      config:
        # xsappname rules: max 100 chars, NO dots — only letters, digits,
        # '_', '-', '/'. Keyed on the space, unique per subaccount.
        xsappname: com-example-cap-myapp-${space}
        tenant-mode: dedicated
        oauth2-configuration:
          credential-types:
            - "binding-secret"
            - "x509"
          redirect-uris:
            - https://*~{app-api/app-uri}/**
    requires:
      - name: app-api

  # PostgreSQL
  - name: com.example.cap.myapp-postgres
    type: org.cloudfoundry.managed-service
    parameters:
      service: postgresql-db
      service-plan: standard
      path: ./.deploy/pg-options.json

  # Object Store (S3-compatible)
  - name: com.example.cap.myapp-objectstore
    type: org.cloudfoundry.managed-service
    parameters:
      service: objectstore
      service-plan: s3-standard
      path: ./.deploy/objectstore-options.json

  # Optional: Job Scheduler (requires the srv binding and the matching
  # grant-as-authority-to-apps scope in xs-security.json)
  # - name: com.example.cap.myapp-jobscheduler
  #   type: org.cloudfoundry.managed-service
  #   parameters:
  #     service: jobscheduler
  #     service-plan: standard

  # HTML5 Application Repository
  - name: com.example.cap.myapp-html5-repo-host
    type: org.cloudfoundry.managed-service
    parameters:
      service: html5-apps-repo
      service-plan: app-host
  - name: com.example.cap.myapp-html5-runtime
    type: org.cloudfoundry.managed-service
    parameters:
      service: html5-apps-repo
      service-plan: app-runtime

  # Destination service
  - name: com.example.cap.myapp-destination
    type: org.cloudfoundry.managed-service
    parameters:
      service: destination
      service-plan: lite
    requires:
      - name: srv-api
```