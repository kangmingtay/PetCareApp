#!/usr/bin/env bash

docker build --no-cache -f ./build/Dockerfile.webprod -t registry.heroku.com/furry-fantasy/web:latest .
docker push registry.heroku.com/furry-fantasy/web:latest
heroku container:release --app=furry-fantasy web
