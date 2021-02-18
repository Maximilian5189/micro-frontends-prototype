import http from 'http';

const port = process.env.PORT || 9001;

http.createServer(function (req, res) {
  if (req.url === '/script.js') {
    res.setHeader('Content-Type', 'application/javascript');
    return res.end(
      `const button = document.getElementById('button1');
      const runScript = () => {
        const div = document.createElement('div');
        const text = document.createTextNode('JS from component 1 executed!');
        div.appendChild(text);
        button.insertAdjacentElement('afterend', div);
      };
      button.addEventListener('click', runScript);`
    );
  }

  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write(`<div>Hello world from component 1!</div>
  <button id="button1">Execute JS from component 1</button><br />`);
  res.end();
}).listen(port);
