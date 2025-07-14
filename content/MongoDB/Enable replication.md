---
description: Enable replication on a single MongoDB instance running inside a docker container
public: true
published: true
---


Extends [[Install official release]]

Replication is used to shard one Mongo instance. It's especially useful when working in bigger clusters. 

It also is a requirement to use [[MongoDB Change Streams + SSE]] properly.

The following setup assumes you have a .env file looking smth like this: 

```txt
UID=1000
GID=1000
  
MONGO_HOSTNAME=mongo
MONGO_PORT=27017
MONGO_USER=mongoapp
MONGO_PASSWORD=password
```

In order to enable replication, do the following: 

1. Create a Keyfile, e.g. with `openssl` 
2. Assign proper rights on the file
```sh
openssl rand -base64 756 > ./db/keys/replica_set_key
sudo chmod 400 ./db/keys/replica_set_key
```

3. Add the following to `mongod.conf` file:
```yaml
security:
  authorization: enabled
  keyFile: /var/lib/mongo/keys/replica_set_key
  
replication:
  replSetName: "rs0"
  
net:
  bindIp: 0.0.0.0
```

4. Add the proper entrypoint, admin user and bind mounts to `docker-compose.yml`
```yaml
mongo:
  image: mongo
  user: "${UID}:${GID}"
  hostname: $MONGO_HOSTNAME
  restart: always
  env_file:
    - ./.env
  environment:
    MONGO_INITDB_ROOT_USERNAME: $MONGO_USER
    MONGO_INITDB_ROOT_PASSWORD: $MONGO_PASSWORD
  ports:
    - "27017:27017"
  entrypoint: ["mongod", "--config", "/etc/mongod.conf"]
  
  volumes:
    - ./db/keys:/var/lib/mongo/keys
    - ./db/mongod.conf:/etc/mongod.conf
    - ./db/data:/data/db
```

5. Add a helper service to the docker compose file. 
   It will activate 
```yaml
mongosetup:
  image: mongo
  depends_on:
    - mongo
  restart: "no"
  env_file:
    - ./.env
  entrypoint: [ "bash", "-c", "sleep 5 && mongosh --host mongo:27017 --username ${MONGO_USER} --password ${MONGO_PASSWORD} --eval 'rs.initiate()'"]
```

