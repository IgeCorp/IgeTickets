import Client from "../structures/Client";

export = class Tickets {
    constructor(client: Client) {
        client.db.query(`CREATE TABLE IF NOT EXISTS tickets (
            id INT NOT NULL AUTO_INCREMENT,
            guild VARCHAR(18) NOT NULL,
            title VARCHAR(255) NOT NULL,
            content TEXT NOT NULL,
            author VARCHAR(18) NOT NULL,
            created VARCHAR(255) NOT NULL,
            PRIMARY KEY (id)
        )`, (err: any, _results: any) => {
            if (err) {
                console.error(err);
            }
            console.log('Tickets table created.');
        });
    }
}