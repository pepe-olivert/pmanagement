#!/bin/bash
docker exec -it postgres_container psql -U pepeolivert pmi --file=$1