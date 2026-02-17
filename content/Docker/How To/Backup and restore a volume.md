---
description: Two scripts to backup and restore docker volumes
tags:
  - docker
  - backups
  - devops
---
## Backup
This script creates a timestamped backup in `tar` format from the defined container (example: snipe-mysql) and path (/var/lib/mysql) using a utility-image

```sh
#!/usr/bin/env bash
set -euo pipefail

#####################################
# Configuration
#####################################

# Name of the running container whose volumes you want to back up
CONTAINER_NAME="snipe-mysql"

# Path inside the container to back up (e.g. /var/lib/mysql)
SOURCE_PATH="/var/lib/mysql"

# Image to use for the helper container (must have tar)
HELPER_IMAGE="ubuntu"

# Directory on the host where backup files will be stored
HOST_BACKUP_DIR="$(pwd)"

# Backup file name pattern (TIMESTAMP will be appended)
TIMESTAMP_FORMAT="%Y%m%d%H%M%S"

#####################################
# Backup execution
#####################################

TIMESTAMP="$(date +"${TIMESTAMP_FORMAT}")"
BACKUP_FILENAME="${CONTAINER_NAME}-${TIMESTAMP}.tar"
BACKUP_PATH="${HOST_BACKUP_DIR}/${BACKUP_FILENAME}"

echo "Creating backup ${BACKUP_PATH} from ${CONTAINER_NAME}:${SOURCE_PATH} ..."

docker run --rm \
  --volumes-from "${CONTAINER_NAME}" \
  -v "${HOST_BACKUP_DIR}:/backup" \
  "${HELPER_IMAGE}" \
  bash -c "cd / && tar cvf \"/backup/${BACKUP_FILENAME}\" \"${SOURCE_PATH}\""

echo "Backup finished: ${BACKUP_PATH}"
```

## Restore
This script restores a `backup.tar` file into a designated container which was previously created by script [[#Backup]]

```sh
#!/usr/bin/env bash
set -euo pipefail

#####################################
# Configuration
#####################################

# Name of the container whose volume should receive the restore
CONTAINER_NAME="snipe-mysql"

# Target path inside the container where data should be restored
TARGET_PATH="/var/lib/mysql"

# Image to use for the helper container (must have tar)
HELPER_IMAGE="ubuntu"

# Directory on the host where backup files are stored
HOST_BACKUP_DIR="$(pwd)"

# Name of the backup file (must exist in HOST_BACKUP_DIR)
BACKUP_FILENAME="backup.tar"

# Whether to strip leading path components from the tar (integer, e.g. 0 or 1)
STRIP_COMPONENTS=1

#####################################
# Restore execution
#####################################

BACKUP_PATH="${HOST_BACKUP_DIR}/${BACKUP_FILENAME}"

if [ ! -f "${BACKUP_PATH}" ]; then
  echo "Backup file not found: ${BACKUP_PATH}" >&2
  exit 1
fi

echo "Restoring ${BACKUP_PATH} into ${CONTAINER_NAME}:${TARGET_PATH} ..."

docker run --rm \
  --volumes-from "${CONTAINER_NAME}" \
  -v "${HOST_BACKUP_DIR}:/backup" \
  "${HELPER_IMAGE}" \
  bash -c "
    mkdir -p '${TARGET_PATH}' && \
    cd '${TARGET_PATH}' && \
    tar xvf \"/backup/${BACKUP_FILENAME}\" --strip-components=${STRIP_COMPONENTS}
  "

echo "Restore finished for ${CONTAINER_NAME}:${TARGET_PATH}"

```