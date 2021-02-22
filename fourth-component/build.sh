#!/bin/bash
cd react-app
npm install
yarn build
searchstring=/static
if [ $1 == 'production' ] 
then
  replacestring=http://my-backend.ddns.net:9004/static
else
  replacestring=http://localhost:9004/static
fi
sed -i.bak "s+${searchstring}+${replacestring}+g" build/index.html && rm build/index.html.bak