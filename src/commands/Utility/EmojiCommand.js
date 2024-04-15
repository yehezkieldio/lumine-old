/* eslint-disable no-unused-vars */
const LumineEmbed = require("../../lib/structures/bot/LumineEmbed");
const LumineUtils = require("../../lib/structures/utils/LumineUtils");

module.exports = {
    name: "emoji",
    aliases: [],
    description: "Menampilkan informasi emoji",
    category: "Utility",
    minArgs: 1,
    maxArgs: 1,
    callback: ({ message, args, client }) => {
        if (!args[0]) {
            const embed = new LumineEmbed()
                .setTitle("Erā ga arimasu! An error has occurred.")
                .setDescription("Input lah sebuah emoji untuk di lihat.");
            return message.channel.send(embed);
        }

        let emoji = LumineUtils.resolveEmojis(args[0], message);

        if (typeof emoji.name === "string") {
            let embed = new LumineEmbed()
                .setTitle("Emoji no ippantekina jōhō! Informasi umum emoji.")
                .setImage(emoji.url)
                .addField("∻ Nama Emoji", emoji.name, true)
                .addField("∻ Emoji ID", emoji.id, true)
                .addField("∻ Asal Guild", emoji.guild.name);
            return message.channel.send(embed);
        }

        return message.channel.send(emoji);
    },
};
