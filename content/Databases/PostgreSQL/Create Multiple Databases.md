---
description: Create several databases and users in a PostgreSQL container
public: true
published: true
---
This snippet is used to create multiple databases on startup when running PostgreSQL inside a docker container. It requires the `$POSTGRES_MULTIPLE_DATABASES` - environment variable to be set.

Use the following `docker-compose.yml` service:
```yml
services:
  postgres:
    image: postgres
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=your_secure_password
      - POSTGRES_MULTIPLE_DATABASES=db1,db2,db3
    volumes:
      - ./init-multiple-dbs.sh:/docker-entrypoint-initdb.d/init-multiple-dbs.sh
```

Save this shell file in the root of your directory under `init-multiple-dbs.sh`:
```sh
#!/bin/bash

set -e
set -u

function create_user_and_database() {
    local database=$1
    echo "  Creating user and database '$database'"
    PGPASSWORD="$POSTGRES_PASSWORD" psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
        CREATE USER $database;
        ALTER USER $database with password '$POSTGRES_PASSWORD';
        CREATE DATABASE $database;
        GRANT ALL PRIVILEGES ON DATABASE $database TO $database;
        GRANT ALL PRIVILEGES ON DATABASE $database TO $POSTGRES_USER;
EOSQL
}

if [ -n "$POSTGRES_MULTIPLE_DATABASES" ]; then
    echo "Multiple database creation requested: $POSTGRES_MULTIPLE_DATABASES"
	   for db in $(echo $POSTGRES_MULTIPLE_DATABASES | tr ',' ' '); do
        create_user_and_database $db
    done
    echo "Multiple databases created"
fi
```