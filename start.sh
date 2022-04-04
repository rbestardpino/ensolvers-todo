#!/usr/bin/env bash

echo "--- Started configuring database ---"
read -p "Enter database name: " DATABASE_NAME
read -s -p "Enter database password: " PASSWORD
sudo -u postgres psql -c "ALTER USER postgres PASSWORD '$PASSWORD';"
sudo -u postgres createdb $DATABASE_NAME
echo "--- Finished configuring database ---"

echo "--- Started loading config variables ---"
echo "DATABASE_URL=\"postgresql://postgres:$PASSWORD@localhost:5432/$DATABASE_NAME?schema=public\"">api/.env
echo "REACT_APP_API_URL=http://localhost:3001">client/.env
echo "--- Finished loading config variables ---"

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
cd api; npm run start:prod &
cd ../client; npm run start:prod