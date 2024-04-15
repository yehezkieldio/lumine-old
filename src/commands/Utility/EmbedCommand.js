const LumineEmbed = require("../../lib/structures/bot/LumineEmbed");

module.exports = {
    name: "embed",
    aliases: [],
    description: "Mengatakan sesuatu sebagai bot menggunakan embed.",
    category: "Utility",
    minArgs: 1,
    maxArgs: -1,
    expectedArgs: "<kata>",
    cooldown: "20s",
    callback: ({ message, args }) => {
        if (!args[0]) {
            const embed = new LumineEmbed()
                .setTitle("Erā ga arimasu! An error has occurred.")
                .setDescription("Input lah sebuah kata untuk di ucapkan.");
            return message.channel.send(embed);
        }

        message.delete();
        const word = args.join(" ").toString();
        const embed = new LumineEmbed().setDescription(word);
        return message.channel.send(embed);
    },
};
