#!/usr/bin/env bash

docker build --no-cache -f build/Dockerfile.app -t registry.heroku.com/furry-fantasy-app/web .
docker push registry.heroku.com/furry-fantasy-app/web
heroku container:release --app=furry-fantasy-app web
