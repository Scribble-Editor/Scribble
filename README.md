# Scribble

## Requirements
- git
- docker-compose

## Setup
```bash
# Clone Git repository
$ git clone git@github.com:PatrickHoward/ISPTermProject.git Scribble
$ cd Scribble

# Build Docker images
$ docker-compose build

# Create and start Docker container stack
$ docker-compose up -d

# Stop all containers on the Docker stack
$ docker-compose down
```

## Endpoints
After starting the container stack, the contains can be accessed at the following locations.

- Client - [http://localhost](http://localhost)
- Server - [http://api.localhost](http://api.localhost)
- Database - [http://localhost:3306](http://localhost:3306)