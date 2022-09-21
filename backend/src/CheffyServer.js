import { } from 'dotenv/config'

import express from 'express';
import cors from 'cors';
import https from 'https';
import fs from 'fs';
import helmet from 'helmet';
import compression from 'compression';

import routes from './routes.js';

const app = express();
app.use(helmet())
app.use(compression())
app.use(cors());
app.use(express.json());
app.use(routes);

const PORT = process.env.PORT || 4000;
const HOST = '';
const SERVER_NAME = process.env.SERVER_NAME || "Cheffy_Server";

//server
const KEY = fs.readFileSync('/etc/letsencrypt/live/rbt.psi.br/privkey.pem');
const CA = fs.readFileSync('/etc/letsencrypt/live/rbt.psi.br/chain.pem');
const CERT = fs.readFileSync('/etc/letsencrypt/live/rbt.psi.br/cert.pem');

const https_options = {
  key: KEY,
  ca: CA,
  cert: CERT
}

https.createServer(https_options, app).listen(PORT, HOST, null, () => {
  console.log(`${SERVER_NAME} HTTPS listening! Port: ${PORT} HTTPS`);
})