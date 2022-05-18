import Client from "../structures/Client";

export = class Teams {
    constructor(client: Client) {
        // an array of teams that are in the database
        client.db.query(`CREATE TABLE IF NOT EXISTS teams (
            id INT NOT NULL,
            guild INT NOT NULL,
            name VARCHAR(255) NOT NULL,
            role INT NOT NULL,
            categorty INT NOT NULL,
            PRIMARY KEY (id)
        )`, (err: any, results: any) => {
            if (err) {
                console.error(err);
            }
            console.log("Teams table created.");
        });
    }
}