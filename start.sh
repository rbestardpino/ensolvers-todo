#!/usr/bin/env bash

echo "--- In order to properly configure the app you will be prompt to enter your user password ---"

echo "--- Started configuring database ---"
read -p "Enter database name: " DATABASE_NAME
read -s -p "Enter database password: " PASSWORD

sudo -i -u postgres
psql -c "ALTER USER postgres PASSWORD '$PASSWORD';"
createdb $DATABASE_NAME
echo "--- Finished configuring database ---"

echo "--- Started loading database info into API ---"
echo "DATABASE_URL=\"postgresql://postgresql:$PASSWORD@localhost:5432/$DATABASE_NAME?schema=public">api/.env
echo "--- Finished loading database info into API ---"

echo "--- Started installing app requirements ---"
cd api
npm install
npm run build
cd ../client
npm install
npm run build
npm install -g serve
cd ..
echo "--- Finished installing app requirements ---" 

echo "--- Starting app ---"
cd api
npm run start:prod
cd ../client
npm run start:prod