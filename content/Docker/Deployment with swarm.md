---
description: Docker swarm permits the rollout of software over several hosts. It build up on compose files and adds a few extras, such as credential handling and distributed architecture
public: true
published:
---
Docker Swarm is a service allowing users to create and manage a cluster of docker nodes. Each nodes is a Docker daemon which can interact with one another. It's similar to docker-compose, but with a few additional perks

- It provides high-availability of nodes by managing failovers of single containers
- It enables roll-back of single tasks
- It is distributed, meaning several machines can join a swarm and act as one

Swarm runs on two different types of nodes
- Manager Nodes which sends out tasks to worker nodes (and knows the status of all worker nodes)
- Worker Nodes which executes the scheduled tasks using a task agent
- The two communicate over HTTP

## Initialize the swarm

```sh
docker swarm init

# These nodes can be distributed over several machines inside the same network. When typing out
sudo docker swarm init --advertise-addr=2003:etc
```

You can type the following on another machine to join that swarm:

```sh
sudo docker swarm join --token <token> [2003:etc]:2377
```

You can then start creating services. To make them available across all nodes, you must run them with the `--global` flag

```sh
sudo docker service create --name <some-name> --mode global [IMAGE]
```

Instead of running a stack with [[Docker compose|docker compose]] on a VM, it's more developer (and admin) friendly to run it using `docker swarm`. 
This comes up with a few improvements:
- `swarm` reduces downtime
- It can be used on multiple hosts
- and properly handle credentials

## Update docker compose file

> [!info] Docker secrets vs. environment variables
> Secrets are mounted into a file instead of providing them as 'env'-variables. This must be adjusted as part of the application. MongoDB uses `MONGO_INITDB_ROOT_PASSWORD_FILE` instead of `MONGO_INITDB_ROOT_PASSWORD`

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

## Deploy
```sh
docker stack deploy -c docker-swarm.yml <app-name>
```

## Using secrets
```sh
echo -n "supersecret" | docker secret create mongo-pw -
echo -n "q-bit" | docker secret create mongo-user -

#STDOUT
vd1xs650z42s453kichhlt9u1
```
Secrets can also be files
 