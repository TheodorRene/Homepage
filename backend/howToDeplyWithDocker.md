# How to deploy
docker build -t sample:dev .
docker container run -p 8000:8000 --add-host=database:IP --detach sample:dev
