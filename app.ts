import dotenv from 'dotenv'
import Server from './src/models/server';

dotenv.config();

console.clear();

const server = new Server();

server.listen();
