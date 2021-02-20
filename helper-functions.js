import got from 'got';

// bug: attached newely wih every request
export const setJavaScript = async (childNode, document) => {
  if (childNode?.className?.includes('javascript')) {
    const scriptElement = document.createElement('script');
    scriptElement.type = 'application/javascript';
    const fragmentNumber = Number(childNode.id.replace('fragment', ''));
    const link = `http://localhost:${9000 + fragmentNumber}`;
    scriptElement.src = `${link}/script.js`;
    document.body.appendChild(scriptElement);
  }
};

export const setInnerHTML = async (childNode, document) => {
  const fragmentNumber = Number(childNode.id.replace('fragment', ''));
  const link = `http://localhost:${9000 + fragmentNumber}`;
  const response = await got(link);

  // bug: attached newely wih every request
  // todo: not the full body is received for react
  const innerHTML = response.body;
  if (childNode?.className?.includes('react')) {
    const domReact = new JSDOM(innerHTML);
    const documentReact = domReact.window?.document;
    documentReact.body.childNodes.forEach(reactChildNode => {
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
};
