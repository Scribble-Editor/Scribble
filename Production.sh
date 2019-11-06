#!/bin/bash

docker-compose -f ./docker-compose.yml build
docker-compose -f ./docker-compose.yml run scribble-client \
    && docker-compose -f ./docker-compose.yml scribble-server scribble-router
