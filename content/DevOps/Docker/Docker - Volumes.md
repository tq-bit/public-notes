---
description: Volumes are dedicated data buckets managed by Docker
public: true
published: false
---
Volumes and bind mounts are used to persist data. While volume paths are handled by docker, bind mounts paths can be specified by the user and are mapped to a local system path.

## Basic Commands for Volumes
-   `-v` add a volume to the container
-   `:ro` make a volume read-only (to be added behind container-fs-path>

```bash
# Start a container with a named volume
docker run -p 80:80 --rm -d --name <container-name> \\ 
  -v <volume-name>:<container-fs-path> \\ 
  <image-name>

# Manually create a volume
sudo docker volume create <volume-name>

# Inspect a volume
sudo docker volume inspect <volume-name>

# Get a list of all active volumes
docker volumes ls

# Get rid of a volume
sudo docker volume rm <volume-name>

# Get rid of orphaned volumes
docker volume prune
```

## Create a Bind Mount
In this case, instead of using a volume name, bind mounts use a file path on the local computer and bind a folder inside the container to it.

> [!tip] Bind mounts for source code
> This is especially useful during development, as a bind mount can mirror code changes into the container's context

```bash
# Start a container with a bind mount
docker run -p 80:80 --rm -d --name <container-name> \\ 
  -v <localhost-fs-path>:<container-fs-path> \\ 
  <image-name>
```

## Permission problems while using docker compose
When running into #unix-permission problems while using bind mounts, try and assign a user to the current compose file

Example for node-red (problems when using bind mount for /data): 

```yml
services:
	node-red:
		user: '${UID}:${GID}'
		image: nodered/node-red
		volumes:
			- ./node-red:/data
		ports:
			- 1880:1880
```