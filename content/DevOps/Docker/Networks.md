---
description: Networks allow docker services to speak to each other using an overlay network created by the docker engine
public: true
published: false
---
Docker networks are used to allow containers to communicate with one another. By default, instead of using an actual IP - adress, docker handles containers by their names and automatically map them to a network.

> [!info] Docker compose
> When running services with [[Docker compose|docker compose]], a dedicated network will be created where each service can access the other - even when no ports are exposed - using their hostname

-   Assume there's two containers: `mongodb` & `node-app`
-   `node-app` can then use an address such as `mongodb://user:password@mongodb/collection` to securely connect to a mongo database.
-   An alternative is to figure the IP - address used by `mongodb` using `sudo docker inspect database`. This is, however, not recommended

Alternatively, if one has to access the local machine from inside a container, it can be done by using `host.docker.internal` instead of `localhost`

## Basic Commands

```bash
# Inspect a container to figure the IP - adress
sudo docker inspect <database-container>

# Create a network
sudo docker network create favorites-net

# Run a container and assign it to a network
sudo docker run --name database --rm -d --network favorites-net mongo
```

Once the network is created, connecting to it from inside a node.js app can be done as follows:

```jsx
mongoose.connect(
  'mongodb://database:27017/swfavorites',
  { useNewUrlParser: true },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      app.listen(3000);
    }
  }
);
```

> If you're using [[Docker compose]], it will create a single network for all services

