import Client from '../structures/Client';

export = (client: Client) => {
    console.log(`${client.user?.tag} is ready`);
}