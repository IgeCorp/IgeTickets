import 'dotenv/config';
import Client from './structures/Client';

const client = new Client();

client.on("ready", () => {
    console.log(client.user?.tag);
});