## MongoDB with secrets
See [[Docker - Deployment with swarm]] for secret configuration

```yml
version: "3.8" # Version of docker-compose spec
services:      # An object that specifies the containers that are used

# Service #1: Database
  mongodb:
    image: "mongo" 
    deploy: 
	  mode: replicated
	  replicas: 1
	  update_config:
	    order: start-first
    volumes: 
      - data:/data/db
    environment: 
      MONGO_INITDB_ROOT_USERNAME_FILE: /run/secrets/mongo-user
      MONGO_INITDB_ROOT_PASSWORD_FILE: /run/secrets/mongo-pw
    secrets: 
      - mongo-pw
    healthcheck: 
	  test: ["CMD", "curl", "-f", "http://localhost:8080/ping"]
	  interval: 30s
	  timeout: 5s
	  retries: 3
	  start_period: 10s
    networks: # Not mandatory. If set, must be maintained under 'networks'
      - my-net

networks:
  my-net:

volumes:
  data:
  logs:
  
secrets: 
  mongo-pw: 
    external: true
  mongo-user: 
    external: true
```
