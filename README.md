# Furry Fantasy Project
Demo Video Link: https://youtu.be/MtqDmYlPbaM

## Introduction
Furry Fantasy is a pet caring service (PCS) which allows pet owners to search for care takers for their pets for certain periods of time.

## Set up

### Running the app in docker containers
1. Clone this project and cd into project root
2. `docker-compose up db` to start the postgres container
3. `docker-compose up web` to start the web container
4. `docker-compose up app` to start the api server container
5. Alternatively, if new json packages are added, run `docker-compose up --build` to rebuild your containers to prevent errors

#### To bash into postgres container:
1. `docker ps` and identify container name (should be `furry_fantasy_db_1`)
2. Run `docker exec -it cs2102_2021_s1_team13_db_1 psql -U root -d furryfantasy`


### Running the app locally
1. In `/web`, run `npm install && npm start`
2. In `/server`, run `npm install && npm start`