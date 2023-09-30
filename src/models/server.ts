import express, { Application } from 'express';
import cors from 'cors';

import userRoutes from '../routes/user';
import db from '../db/connection';

class Server {
    private app: Application;
    private port: string;
    private apiPaths = {
        users: '/api/users',
    };

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8080';

        this.dbConnection();

        this.middlewares();

        this.routes();
    }

    async dbConnection() {
        try {
            await db.authenticate();
            console.log('Database online', db.config.database, db.config.host, db.config.port);
        } catch (error: unknown) {            
            console.log(`Error connection to ${db.config.database} ${db.config.host} ${db.config.port} `);
            
            throw new Error(error as string | undefined);
        }
    }

    middlewares() {
        // cors
        this.app.use(cors());
        // read body
        this.app.use(express.json());
        // public
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.apiPaths.users, userRoutes);
    }

    listen() {
        this.app.listen(this.port, (port = this.port) => {
            console.log(`Server running on ${port}.`);
        });
    }
}

export default Server;
