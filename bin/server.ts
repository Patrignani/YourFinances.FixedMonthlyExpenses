import * as http from "http";
import { app } from "../src/app";
import * as utils from '../src/utils/server-utils';
import { SystemConfig } from '../src/config/system-config'

const debug = require('debug')('nodestr:server');
const port = utils.normalizePort(process.env.PORT || SystemConfig.PORT);

const server = http.createServer(app);

server.listen(port);
server.on('error', (error:any)=>{ utils.onError(error,port)});
server.on('listening', ()=>{ utils.onListening(server,debug)});

console.log("Server on =>>>");