---
description: Code snippets to build a basic node.js image using docker
---

## Create an Image with Docker Build
Each docker container is based on an image. This image is built using a `dockerfile` that exists at the root of the project directory. Example for a node.js app:

```dockerfile
# Use nodejs as a base image
FROM node:14

# Describe the directory inside the container
WORKDIR /app

# Copy the package json file inside the dir
COPY package.json .

# Install dependencies
RUN npm install

# Copy the rest of the code
COPY . .

# Expose the app
EXPOSE 3000

# Run the node command
CMD ["node", "app.js"]
```

## Build the Image and Tag it

The image can then be built with the following command. This is mandatory to push it to platforms like Dockerhub

-   `-t` flag to give the image a name and an optional tag

```bash
sudo docker build -t <image-name>:<image-tag> .
```

## Build the Image with a Custom Dockerfile

In order to build an image with a non-standard `Dockerfile`, run the following command:

-   `-f` flag to provide the name of the docker file that's used for building

```bash
sudo docker build -f Dockerfile.prod -t <image-name>:<image-tag> .
```