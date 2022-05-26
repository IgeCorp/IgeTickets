"use strict";
module.exports = class Tickets {
    constructor(client) {
        client.db.query(`CREATE TABLE IF NOT EXISTS tickets (
            id INT NOT NULL AUTO_INCREMENT,
            guild VARCHAR(18) NOT NULL,
            title VARCHAR(255) NOT NULL,
            content TEXT NOT NULL,
            author VARCHAR(18) NOT NULL,
            created VARCHAR(255) NOT NULL,
            PRIMARY KEY (id)
        )`, (err, _results) => {
            if (err) {
                console.error(err);
            }
            console.log('Tickets table created.');
        });
    }
};
