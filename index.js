import { JSDOM } from 'jsdom';
import fs from 'fs'; 
import http from 'http';
import request from 'node-fetch';

const port = process.env.PORT || 9000;

const dom = new JSDOM(`<!DOCTYPE html>
<div>Hello world from parent!</div>
<br />
<div id="fragment1"></div>
<div id="fragment2"></div>`, 
{ runScripts: "dangerously" });
const { document } = dom.window

const links = {
  fragment1: 'http://localhost:9001',
  fragment2: 'http://localhost:9002'
}

const setInnerHTML = async (childNode) => {
  const response = await request(links[childNode.id]);
  const innerHTML = await response.text();
  childNode.innerHTML = innerHTML;
}

const getJavaScript = async (childNode) => {
  // workaround!!!!
  if (childNode.id.includes('fragment1')) {
    const scriptElement = document.createElement('script');
    scriptElement.type = 'application/javascript';
    scriptElement.src = `${links[childNode.id]}/script.js`;
    document.body.appendChild(scriptElement);
  }
}

const getFragmentsContent = async () => {
  const fragmentResults = [];

  document.body.childNodes.forEach(childNode => {
    if (links[childNode.id]) {
      fragmentResults.push(setInnerHTML(childNode));
      fragmentResults.push(getJavaScript(childNode));
    }
  });

  await Promise.all(fragmentResults)
}

const gethtml = async () => {
  await getFragmentsContent();
  return dom.serialize();
}

// fs.writeFile("index.html", html, (err) => {
//   if (err) 
//     console.log(err); 
//   else { 
//     console.log("File written successfully"); 
//   } 
// });

http.createServer(async (req, res) => {
  // res.writeHead(200, {'Content-Type': 'text/plain'});
  const html = await gethtml();
  res.write(html);
  res.end();
}).listen(port);