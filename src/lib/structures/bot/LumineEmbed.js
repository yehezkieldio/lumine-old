const { MessageEmbed } = require("discord.js");
const client = require("../../../index");

class LumineEmbed extends MessageEmbed {
    constructor() {
        super();

        this.setColor("#fbe7a1");

        this.setAuthor(client.user.username, client.user.avatarURL());

        this.setTimestamp();
    }
}

module.exports = LumineEmbed;
