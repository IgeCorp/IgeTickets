"use strict";
module.exports = class Teams {
    constructor(client) {
        client.db.query(`CREATE TABLE IF NOT EXISTS teams (
            id INT NOT NULL AUTO_INCREMENT,
            guild VARCHAR(18) NOT NULL,
            name VARCHAR(255) NOT NULL,
            role VARCHAR(18) NOT NULL,
            category VARCHAR(18) NOT NULL,
            PRIMARY KEY (id)
        )`, (err, _results) => {
            if (err) {
                console.error(err);
            }
            console.log('Teams table created.');
        });
    }
};
