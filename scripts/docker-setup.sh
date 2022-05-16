#!/usr/bin/env sh
BASEDIR=$(dirname "$0")/..

cd $BASEDIR
docker-compose run --rm setup
