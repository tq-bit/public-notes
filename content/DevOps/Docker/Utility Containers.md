---
description: Utility containers (or sidecar containers in a Kubernetes context) run code that is not part of a core image, but extends its functionality
---
The following Dockerfile creates a basic setup for Vue apps using the Vue CLI. The additional steps to set up a user make sure that local files are changeable without any permission issues

```dockerfile
FROM node:14

WORKDIR /vue-setup

RUN npm install -g @vue/cli

# The following commands ensure access to our files
# If we left them out, changing files on our local setup
# would fail due to insufficient permissions. 
RUN userdel -r node

ARG USER_ID

ARG GROUP_ID

RUN addgroup --gid $GROUP_ID user

RUN adduser --disabled-password --gecos '' --uid $USER_ID --gid $GROUP_ID user

# Set the active user and open the interactive terminal
USER user

ENTRYPOINT [ "bash" ]
```

Command to build, assuming the Dockerfile is located under `/dockerfiles/Setup.Dockerfile`

```bash
docker build \\
	--build-arg USER_ID=$(id -u) \\
	--build-arg GROUP_ID=$(id -g) \\
	-t node_test - < ./dockerfiles/Setup.Dockerfile
```

> [!warning] When building a docker image with `-`, there is no building context added (e.g. no files outside of the CWD of the Dockerfile can be accessed

Command to run a container:

```bash
docker run \\
	-v /home/earthenlynx/Development/Q_Bit_Code/13_Docker_Vue/:/vue-setup \\
  -it --rm node_test
```



