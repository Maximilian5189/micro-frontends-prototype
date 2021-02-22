import got from 'got';
import { JSDOM } from 'jsdom';

const baseUrl = process.env.BASEURL || 'http://localhost:'

export const setJavaScript = async (childNode, document) => {
  // todo: maybe allow async javascript via className
  if (childNode?.className?.includes('javascript')) {
    const scriptElement = document.createElement('script');
    scriptElement.type = 'application/javascript';
    const fragmentNumber = Number(childNode.id.replace('fragment', ''));
    const link = `${baseUrl}${9000 + fragmentNumber}`;
    scriptElement.src = `${link}/script.js`;
    document.body.appendChild(scriptElement);
  }
};

export const setInnerHTML = async (childNode, document) => {
  const fragmentNumber = Number(childNode.id.replace('fragment', ''));
  const link = `${baseUrl}${9000 + fragmentNumber}`;
  const response = await got(link);

  const innerHTML = response.body;
  if (childNode?.className?.includes('react')) {
    const domReact = new JSDOM(innerHTML);
    const documentReact = domReact.window?.document;
    childNode.appendChild(documentReact.body)
    documentReact.head.childNodes.forEach(reactChildNode => {
      if (reactChildNode.rel === 'stylesheet') {
        document.head.appendChild(reactChildNode);
      }
    });
  } else {
    childNode.innerHTML = innerHTML;
  }
};
