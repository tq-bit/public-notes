---
description: Code snippets for common docker tasks
public: true
published:
---
## Basic Container Commands

### Get a List of Active Containers
-   `-a` shows all containers

```bash
# Get a list of running containers
docker ps -a
```

### Start and Stop Containers
-   `--name` gives the container a name
-   `--rm` removes the container when it's stopped
-   `-d` runs the container in detached mode (does not block the terminal)
-   `-p` map a port from inside the container to one that's exposed to the outside

```bash
# Start a container from an image
docker run --name <container-name> --rm -d <image-name>

# Start a container and expose a port to the outside
docker run --name <container-name> --rm -d -p <port>:<port> <image-name>

# Stop a running container
docker stop <container-name> 

# Remove a stopped container
docker rm <container-id/name>

# Get rid of old containers
docker system prune
```

### Attach and Detach Containers, Interactive Sessions

-   `-it` run a container in interactive mode (open a terminal session)

```bash
# Start a container from an image
docker run -it <image-name>

# Attach an active container to the terminal
docker attach <container-name/id>

# For a stopped container, use attach + interactive
docker start -a -i <container-id/name>
```

## Basic Image Commands

-   `-t` gives the image a name

```bash
# Build a new image
docker build .

# Build and tag an image
docker build -t <image-name>:<tag> .

# Remove an image 
docker rmi <image-name>

# Inspect an image
docker image inspect <image-id>
```

