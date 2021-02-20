import http from 'http';

const port = process.env.PORT || 9002;

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write(`<div>Hello world from component 2!</div><br />`);
  res.end();
}).listen(port);
