import 'dotenv/config';
import Client from './structures/Client';

new Client();

process.argv[2] === '--dev' ? console.log('Running in development mode.') : console.log('Running in production mode.');