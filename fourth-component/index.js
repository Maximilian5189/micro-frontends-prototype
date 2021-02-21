import http from 'http';
import fs from 'fs';

const port = process.env.PORT || 9004;

http.createServer(function (req, res) {
  if (req.url.includes('static')) {
    fs.readFile(`./react-app/build${req.url}`, (error, file) => {
      if (req.url.includes('/static/js')) {
        res.setHeader('Content-Type', 'application/javascript');
      } else {
        res.setHeader('Content-Type', 'text/css');
      }
      res.end(file);
    })
  } else {
    fs.readFile('./react-app/build/index.html', (error, file) => {
      if (error) res.end('<div>React app was not loaded!</div>')

      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end(file);
    })
  }
}).listen(port);
