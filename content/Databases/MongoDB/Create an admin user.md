---
description: A code snippet to create a new admin user in a local MongoDB and enable authentication
public: true
published: true
---
This snippet creates an administrative user with read and write access to every database in a local MongoDB distribution.

> [!tip]
> - This command requires MongoSH to be installed.
> - You need to have a local [[Install official release|MongoDB]] up and running
> - Check the official [MongoDB-Security Guide](https://www.mongodb.com/docs/manual/security/) for a secure implementation

```bash
# Creating admin user with password
echo "Attempting to create a new admin user"
mongosh \
--quiet \
--eval "use admin" \
--eval "db.createUser({user: \"$MONGO_ADMIN_USERNAME\", pwd: \"$MONGO_ADMIN_PASSWORD\", roles: [{ role: \"userAdminAnyDatabase\", db: \"admin\" },{ role: \"readWriteAnyDatabase\", db: \"admin\" }]})" \
mongodb://localhost/
  
echo Attempting to create a new database
mongosh \
--quiet \
--eval "use mongo_app" \
--eval "db.mongo_app_collection.insertOne({ msg: \"Hello World\" })" \
mongodb://localhost/
  
echo Attempting to create new user for database mongo_app
mongosh \
--quiet \
--eval "use admin" \
--eval "db.createUser({user: \"$MONGO_USER_USERNAME\", pwd: \"$MONGO_USER_PASSWORD\", roles: [{ role: \"readWrite\", db: \"mongo_app\" }]})" \
mongodb://localhost/
  
echo "Enabling authorization on MongoDB Server"
sudo sed -i 's/#security:/security:\n\ \ authorization: enabled/' $MONGOD_CONF_PATH
  
echo "Done! You can try and connect to the db with your new user using the below command"
echo "mongosh --authenticationDatabase \"admin\" -u $MONGO_USER_USERNAME -p"
```