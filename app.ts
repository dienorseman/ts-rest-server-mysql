import dotenv from 'dotenv'
dotenv.config();

import Server from './src/models/server';


console.clear();

const server = new Server();

server.listen();
