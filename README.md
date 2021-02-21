# Micro frontends prototype
This is a basic prototype consisting of a composer service and several micro frontend components.

## Prerequisites
`Node.js` and `Go` have to be installed.
## Set up the project
Run `npm install` in the root directory.

## Run the project
Run `npm start` in the root directory, this will start the composer service and all components. The composer listens on `localhost:9000`.

## Add a new component
Create a new folder with an index.js, which runs a web server on a specific port. Basic example:
```
import http from 'http';

const port = process.env.PORT || 9004;

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write('<div>Hello world from component 2!</div><br />');
  res.end();
}).listen(port); 
```

In addition, add a new fragment to `./dom.js`. The fragment number will determine the port number where the composer service will look for the component, so make sure these are matching (e.g. `fragment4` and `port = 9004`).
  
If the component should be started automatically, add it to the start script in `package.json`.