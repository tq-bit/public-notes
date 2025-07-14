---
description: Docker compose allows devs to run several containers inside an encapsulated environment without the need to maintain separate networks, volumes and mounts
public: true
published:
---
Docker Compose is a feature of Docker to orchestrate several software components using a declarative `.yml` file. Docker Compose is useful for [[Compose - Fullstack - Dev|development]], as well as [[Compose - Fullstack - Prod|productive]] scenarios, whereas [[Docker - Docker Swarm|Docker Swarm]] is generally preferable for prod.

As of today, docker compose is part of the Docker engine. It used to be a plugin before. 
It cannot work independently and requires other [[Docker - Basic Dockerfile|dockerfiles]] or remote docker images to function. 

## Port forwarding

> [!tip] About ports during development
> In case you ever encounter problems with docker-compose (e.g. network not reachable), try to expose the host from inside the dev script

With Vite, this problem was fixed by exchanging the standard dev script:

```jsx
"scripts": {
  "dev": "vite --host 0.0.0.0"
},
```

## Further reading


Official docs:
[Overview of Docker Compose](https://docs.docker.com/compose/)