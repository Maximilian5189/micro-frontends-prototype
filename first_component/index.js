import http from 'http';
import fs from 'fs';

const port = process.env.PORT || 9001;

http.createServer(function (req, res) {
  if (req.url === '/script.js') {
    fs.readFile(`.${req.url}`, (error, file) => {
      res.setHeader('Content-Type', 'application/javascript');
      res.end(file);
    })
  } else {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write(`<div>Hello world from component 1!</div>
    <button id="button1">Execute JS of component 1</button><br />`);
    res.end();
  }
}).listen(port);
