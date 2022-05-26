"use strict";
module.exports = (client) => {
    console.log(`${client.user?.tag} is ready`);
    client.postSlashs();
};
