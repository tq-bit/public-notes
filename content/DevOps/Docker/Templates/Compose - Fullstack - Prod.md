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
      dockerfile: be.prod.dockerfile
    ports:
      - '8080:8080'
      - '9090:9090'
    env_file:
      - ./.env
    depends_on: # Describe backend depdendency
      - postgres

  frontend:
      # build: ./vite-login-app
    build:
      context: ./frontend
      dockerfile: fe.prod.dockerfile

    ports:
      - '3000:80'
    expose:
      - '80'
    depends_on:
      - backend
    stdin_open: true
    tty: true

volumes: # Volumes will be shared among services
  pgdata:
  logs:
```