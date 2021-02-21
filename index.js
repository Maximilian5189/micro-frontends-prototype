import { JSDOM } from 'jsdom';
import http from 'http';
import { setJavaScript, setInnerHTML } from './helper-functions.js';
import rawDom from './dom.js';

const port = process.env.PORT || 9000;

const getFragmentsContent = async (document) => {
  const fragmentResults = [];

  document?.body?.childNodes?.forEach(childNode => {
    if (childNode?.id?.includes('fragment')) {
      fragmentResults.push(setInnerHTML(childNode, document));
      fragmentResults.push(setJavaScript(childNode, document));
    }
  });

  await Promise.all(fragmentResults)
}

const gethtml = async () => {
  const dom = new JSDOM(rawDom);
  const { document } = dom.window;

  try {
    await getFragmentsContent(document);
  } catch (e) {
    console.log(e)
  }
  return dom.serialize();
}

// todo: maybe split app and server
http.createServer(async (req, res) => {
  const html = await gethtml();
  res.end(html);
}).listen(port);
