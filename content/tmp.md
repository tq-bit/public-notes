```yml
name: leantime

services:
  db:
    image: mysql:8.4
    container_name: leantime_db
    restart: unless-stopped
    env_file: .env
    command: --character-set-server=UTF8MB4 --collation-server=UTF8MB4_unicode_ci
    volumes:
      - ./db_data:/var/lib/mysql
    networks:
      - leantime-internal
    healthcheck:
      # TCP check, not socket: the first-run init server listens on the socket only
      test: ["CMD", "mysqladmin", "ping", "-h", "127.0.0.1", "--silent"]
      interval: 10s
      timeout: 10s
      retries: 10
      start_period: 300s   # first-time data-directory init can take minutes

  app:
    image: leantime/leantime:3.4.3   # pin a version; don't use :latest in production
    container_name: leantime
    restart: unless-stopped
    env_file: .env
    security_opt:
      - no-new-privileges:true
    cap_add:
      - CAP_CHOWN
      - CAP_SETGID
      - CAP_SETUID
    volumes:
      - ./lt_public_userfiles:/var/www/html/public/userfiles   # logo, public uploads
      - ./lt_userfiles:/var/www/html/userfiles                 # attached files
      - ./lt_plugins:/var/www/html/app/Plugins                 # marketplace plugins
      - ./lt_logs:/var/www/html/storage/logs
    networks:
      - leantime-internal
    depends_on:
      db:
        condition: service_healthy
    healthcheck:
      test: ["CMD", "curl", "-fsS", "http://localhost:8080/"]
      interval: 30s
      timeout: 10s
      retries: 5
      start_period: 60s

networks:
  leantime-internal:
    internal: true
```

.env

```sh
# --- Leantime core ---
LEAN_SITENAME=Leantime
LEAN_APP_URL=https://projects.tqbit-hub.de
LEAN_SESSION_PASSWORD=1z2dhz128dg1287dg128dg1h28d128d187zd8172d712z7812

# --- Database (LEAN_* must match MYSQL_*) ---
LEAN_DB_HOST=db
LEAN_DB_USER=leantime
LEAN_DB_PASSWORD=<strong-db-password>
LEAN_DB_DATABASE=leantime

MYSQL_DATABASE=leantime
MYSQL_USER=leantime
MYSQL_PASSWORD=dhi1u28d1783dih238dg182i
MYSQL_ROOT_PASSWORD=19287398123791283z128hd

# --- Email (optional, for notifications and password resets) ---
LEAN_EMAIL_SMTP_HOST=smtp.example.com
LEAN_EMAIL_SMTP_PASSWORD=<smtp-password>
LEAN_EMAIL_SMTP_PORT=587
LEAN_EMAIL_SMTP_USER=no-reply@example.com
LEAN_EMAIL_SMTP_FROM=no-reply@example.com

# --- Timezone ---
TZ=Europe/Berlin
```