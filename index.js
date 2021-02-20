import { JSDOM } from 'jsdom';
import fs from 'fs'; 
import http from 'http';
import got from 'got';

const port = process.env.PORT || 9000;

const dom = new JSDOM(`<!DOCTYPE html>
<div>Hello world from parent!</div>
<br />
<div id="fragment1" class="javascript"></div>
<div id="fragment2"></div>
<div id="fragment3"></div>`);
const { document } = dom.window;

// todo: env file
// bug: attached newely wih every reques
const setInnerHTML = async (childNode) => {
  const fragmentNumber = Number(childNode.id.replace('fragment', ''));
  const link = `http://localhost:${9000 + fragmentNumber}`;
  const response = await got(link);
  // todo: not the full body is received for react
  const innerHTML = response.body;
  if (childNode?.className?.includes('react')) {
    const domReact = new JSDOM(innerHTML);
    const documentReact = domReact.window?.document;
    documentReact.body.childNodes.forEach(reactChildNode => {
      console.log(reactChildNode.nodeName)
      childNode.appendChild(reactChildNode)
    });
    documentReact.head.childNodes.forEach(reactChildNode => {
      if (reactChildNode.rel === 'stylesheet') {
        document.head.appendChild(reactChildNode);
      }
    });
  } else {
    childNode.innerHTML = innerHTML;
  }
}

const getJavaScript = async (childNode) => {
  if (childNode?.className?.includes('javascript')) {
    const scriptElement = document.createElement('script');
    scriptElement.type = 'application/javascript';
    const fragmentNumber = Number(childNode.id.replace('fragment', ''));
    const link = `http://localhost:${9000 + fragmentNumber}`;
    scriptElement.src = `${link}/script.js`;
    document.body.appendChild(scriptElement);
  }
}

const getFragmentsContent = async () => {
  const fragmentResults = [];

  document.body.childNodes.forEach(childNode => {
    if (childNode?.id?.includes('fragment')) {
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
  const html = await gethtml();
  res.end(html);
}).listen(port);