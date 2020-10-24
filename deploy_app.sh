#!/usr/bin/env bash

docker build -f build/Dockerfile.app -t furry-fantasy-app .
docker push registry.heroku.com/furry-fantasy-app/web
heroku container:release --app=furry-fantasy-app web
