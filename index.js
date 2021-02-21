import http from 'http';
import { app } from './app.js';

const port = process.env.PORT || 9000;

http.createServer(app).listen(port);
