import { Sequelize } from 'sequelize';

// Load environment variables
import dotenv from 'dotenv';
dotenv.config();

const dbName = process.env.DB_NAME || 'test';
const dbUser = process.env.DB_USER || 'root';

const db = new Sequelize(
    dbName,
    dbUser,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        logging: true,
        port: Number(process.env.DB_PORT),
    }
);

export default db;
