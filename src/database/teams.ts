import Client from '../structures/Client';

export = class Teams {
    constructor(client: Client) {
        client.db.query(`CREATE TABLE IF NOT EXISTS teams (
            id INT NOT NULL,
            guild INT NOT NULL,
            name VARCHAR(255) NOT NULL,
            role INT NOT NULL,
            category INT NOT NULL,
            PRIMARY KEY (id)
        )`, (err: any, results: any) => {
            if (err) {
                console.error(err);
            }
            console.log('Teams table created.');
        });
    }
}