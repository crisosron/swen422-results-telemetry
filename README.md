# SWEN422 Results Telemetry

## Setup

### Prerequisites
- [Docker](https://www.docker.com/)
- [docker-compose](https://docs.docker.com/compose/)

### First time setup
1. `cp .env.example .env`
2. Get yourself a `.env` file with values and copy-paste it into the .env file resulting from the command above
3. `docker-compose up --build`
4. Wait a while for the containers to spin up...and you should be ready to go for local development!

### Already setup in the past?
- `docker-compose up` - This will start up all the containers

### Useful commands
```bash

# Starts all containers of the application
docker-compose up

# Stops all containers
CTRL+C (in console where docker-compose process is running)

# Stops and removes all containers, volumes, and images created by docker-compose up
docker-compose down

# Starts all containers, but build them first
docker-compose up --build

# Start a shell session with a container
docker exec -it <container-name> /bin/bash

```
