"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const Client_1 = __importDefault(require("./structures/Client"));
new Client_1.default();
process.argv[2] === '--dev' ? console.log('Running in development mode.') : console.log('Running in production mode.');
