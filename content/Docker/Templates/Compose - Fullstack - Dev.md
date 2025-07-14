## PostgreSQL

```yml
version: '3.8' # Version of docker-compose spec
services: # An object that specifies the containers that are used
  # Service #1: Database
  postgres:
    image: postgres
    ports:
      - '5432:5432'
    env_file:
      - ./.env
    volumes:
      - pgdata:/var/lib/postgresql/data

  # Service #2: API
  backend:
    build:
      context: ./backend
      dockerfile: be.dev.dockerfile
    ports:
      - '8080:8080'
      - '9090:9090'
    volumes:
      - ./backend:/backend # bind mounts can be added with rel. path
      # - /app/node_modules # specify anonymous volumes
    env_file:
      - ./.env
    depends_on: # Describe backend depdendency
      - postgres

  frontend:
      # build: ./vite-login-app
    build:
      context: ./frontend
      dockerfile: fe.dev.dockerfile

    # volumes are only relevant for development
    volumes:
      - ./frontend:/frontend

    ports:
      - '3000:3000'
    expose:
      - '3000'
    depends_on:
      - backend
    stdin_open: true
    tty: true

volumes: # Volumes will be shared among services
  pgdata:
  logs:
```

## MongoDB

```yaml
version: "3.8" # Version of docker-compose spec
services:      # An object that specifies the containers that are used

# Service #1: Database
  mongodb: # Name of the DB container
    image: "mongo" # Name of the image to be used in mongodb
    volumes: # Array of named volumes
      - data:/data/db
    environment: # Key - value pairs of environment variables
      MONGO_INITDB_ROOT_USERNAME: q-bit
      MONGO_INITDB_ROOT_PASSWORD: supersecret
    # env_file: # Environment file with relative path to docker-compose file
      # - ./.env
    networks: # Not mandatory. If set, must be maintained under 'networks'
      - my-net

# Service #2: API
  backend: # name of api container
    build: # longer form with a separate folder + named dockerfile
      context: ./backend
      dockerfile: dev.dockerfile
    ports:  # <hostport : containerport>
      - "80:80"
    networks:
      - my-net
    volumes:
      - ./backend:/src # bind mounts can be added with rel. path
      # - /app/node_modules # specify anonymous volumes
    environment:
      MONGODB_USERNAME: q-bit
      MONGODB_PASSWORD: supersecret
    depends_on: # Describe backend depdendency
      - mongodb

# Service #3: Frontend
  client: # name of react app container
    build: ./client # shorter path. Must have a single .dockerfile
    ports:
      - "3000:3000"
    volumes:
      - ./frontend/src:/app/src
    stdin_open: true # Open an interactive session
    tty: true # Open the terminal
    depends_on: # Describe frontend dependency
      - backend

networks: # Define the networks that are used
  my-net:

volumes: # Volumes will be shared among services
  data:
  logs:
```