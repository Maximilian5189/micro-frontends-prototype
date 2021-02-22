#!/bin/bash
cd react-app
npm install
yarn build
searchstring=/static
replacestring=http://localhost:9004/static
sed -i "" "s+${searchstring}+${replacestring}+g" build/index.html
