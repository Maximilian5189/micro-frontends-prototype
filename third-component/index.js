import http from 'http';
import fs from 'fs';

const port = process.env.PORT || 9003;

http.createServer(function (req, res) {
  if (req.url === '/static/script.js') {
    fs.readFile(`.${req.url}`, (error, file) => {
      res.setHeader('Content-Type', 'application/javascript');
      res.end(file);
    })
  } else {
    res.end('<third-component></third-component>');
  }
}).listen(port);
