import Client from '../structures/Client';

export = class Teams {
    constructor(client: Client) {
        client.db.query(`CREATE TABLE IF NOT EXISTS teams (
            id INT NOT NULL AUTO_INCREMENT,
            guild VARCHAR(18) NOT NULL,
            emoji VARCHAR(255) NOT NULL,
            name VARCHAR(255) NOT NULL,
            role VARCHAR(18) NOT NULL,
            category VARCHAR(18) NOT NULL,
            PRIMARY KEY (id)
        )`, (err: any, _results: any) => {
            if (err) {
                console.error(err);
            }
            console.log('Teams table created.');
        });
    }
}