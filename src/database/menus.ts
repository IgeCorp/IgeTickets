import Client from "../structures/Client";

export = class Menus {
    constructor(client: Client) {
        client.db.query(`CREATE TABLE IF NOT EXISTS menus (
            id INT NOT NULL AUTO_INCREMENT,
            message VARCHAR(18),
            guild VARCHAR(18) NOT NULL,
            title VARCHAR(255) NOT NULL,
            description VARCHAR(4000) NOT NULL,
            team VARCHAR(2000) NOT NULL,
            channel VARCHAR(18) NOT NULL,
            PRIMARY KEY (id)
        )`, (err) => {
            if (err) {
                console.error(err);
            }

            console.log("Menus table created");
        });
    }
}