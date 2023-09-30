"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_1 = __importDefault(require("../routes/user"));
const connection_1 = __importDefault(require("../db/connection"));
class Server {
    constructor() {
        this.apiPaths = {
            users: '/api/users',
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '8080';
        this.dbConnection();
        this.middlewares();
        this.routes();
    }
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection_1.default.authenticate();
                console.log('Database online', connection_1.default.config.database, connection_1.default.config.host, connection_1.default.config.port);
            }
            catch (error) {
                console.log(`Error connection to ${connection_1.default.config.database} ${connection_1.default.config.host} ${connection_1.default.config.port} `);
                throw new Error(error);
            }
        });
    }
    middlewares() {
        // cors
        this.app.use((0, cors_1.default)());
        // read body
        this.app.use(express_1.default.json());
        // public
        this.app.use(express_1.default.static('public'));
    }
    routes() {
        this.app.use(this.apiPaths.users, user_1.default);
    }
    listen() {
        this.app.listen(this.port, (port = this.port) => {
            console.log(`Server running on ${port}.`);
        });
    }
}
exports.default = Server;
