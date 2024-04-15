const LumineEmbed = require("../../lib/structures/bot/LumineEmbed");

module.exports = {
    name: "say",
    aliases: ["botsay", "ucapkan", "katakan", "bilang"],
    description: "Mengatakan sesuatu sebagai bot.",
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

        const word = args.join(" ").toString();
        message.channel.send(word);
        message.delete();
    },
};
