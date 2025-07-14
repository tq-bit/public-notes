---
description: Install the official MongoDB release on a linux machine
public: true
published: true
---
> [!info] 
> Make sure files are executable `sudo chmod +x <filename>`
> This script is made for **Ubuntu 22.04** releases

```bash
#!/bin/bash
MONGO_VERSION_MAJOR=6
MONGO_VERSION_MINOR=0
MONGO_VERSION_PATCH=4
MONGO_SERVICE_NAME="mongod"

SYSCTL_CONF_PATH="/etc/sysctl.conf"

set -e

# Run default update process
sudo apt update && sudo apt upgrade -y

# Install MongoDB 6.0.4 for Ubuntu v22.04
sudo apt-get install gnupg libc6

curl -fsSL https://pgp.mongodb.com/server-$MONGO_VERSION_MAJOR.$MONGO_VERSION_MINOR.asc | \

sudo gpg -o /usr/share/keyrings/mongodb-server-$MONGO_VERSION_MAJOR.$MONGO_VERSION_MINOR.gpg \
--dearmor


echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-$MONGO_VERSION_MAJOR.$MONGO_VERSION_MINOR.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/$MONGO_VERSION_MAJOR.$MONGO_VERSION_MINOR multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-$MONGO_VERSION_MAJOR.$MONGO_VERSION_MINOR.list

sudo apt update

sudo apt-get install -y mongodb-org=$MONGO_VERSION_MAJOR.$MONGO_VERSION_MINOR.$MONGO_VERSION_PATCH mongodb-org-database=$MONGO_VERSION_MAJOR.$MONGO_VERSION_MINOR.$MONGO_VERSION_PATCH mongodb-org-server=$MONGO_VERSION_MAJOR.$MONGO_VERSION_MINOR.$MONGO_VERSION_PATCH mongodb-org-mongos=$MONGO_VERSION_MAJOR.$MONGO_VERSION_MINOR.$MONGO_VERSION_PATCH mongodb-org-tools=$MONGO_VERSION_MAJOR.$MONGO_VERSION_MINOR.$MONGO_VERSION_PATCH
  
echo "Installed mongodb-org v$MONGO_VERSION_MAJOR.$MONGO_VERSION_MINOR.$MONGO_VERSION_PATCH"
echo "Configuration file written to /etc/$MONGO_SERVICE_NAME.conf"
  
sudo systemctl daemon-reload
sudo systemctl enable $MONGO_SERVICE_NAME

echo "Attempting to start $MONGO_SERVICE_NAME"
sudo systemctl start $MONGO_SERVICE_NAME
```

## Optimisations

> [!important] 
> Run this only after the above script

References: 
- https://www.mongodb.com/docs/manual/reference/ulimit/#linux-distributions-using-systemd 
- https://www.mongodb.com/docs/manual/administration/production-checklist-operations/

```bash
echo "Adjusting ulimit settings for $MONGO_SERVICE_NAME"

sudo cp /lib/systemd/system/$MONGO_SERVICE_NAME.service /etc/systemd/system/

# Adjust swappiness for Mongod process,
# See https://www.mongodb.com/docs/manual/administration/production-notes/#mongodb-on-linux
if ! grep -q "vm.swappiness" $SYSCTL_CONF_PATH; then
	echo "Adjusting vm.swappiness in $SYSCTL_CONF_PATH"
	echo "vm.swappiness = 1" | sudo tee -a /etc/sysctl.conf
fi
  
# Adjust vm.max_map_count
if ! grep -q "vm.max_map_count" $SYSCTL_CONF_PATH; then
	echo "Adjusting vm.max_map_count in $SYSCTL_CONF_PATH"
	echo "vm.max_map_count = 262144" | sudo tee -a /etc/sysctl.conf
fi
  
# Reload sysctl with new config
sudo sysctl -p
  
echo Restarting MongoDB to apply settings
sudo systemctl daemon-reload
sudo systemctl restart mongod
echo Success. You can connect to MongoDB using 'mongosh'
```