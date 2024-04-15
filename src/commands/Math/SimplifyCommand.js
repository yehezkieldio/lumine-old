const LumineEmbed = require("../../lib/structures/bot/LumineEmbed");
const LumineMath = require("../../lib/structures/utils/LumineMath");

module.exports = {
    name: "sederhanakan",
    aliases: ["simplify", "sederhana"],
    description: "Menyerderhanakan hasil bilangan",
    category: "Math",
    minArgs: 1,
    maxArgs: -1,
    expectedArgs: "<equation>",
    cooldown: "5s",
    callback: ({ message, args }) => {
        const input = args.join(" ");

        if (!args[0]) {
            const embed = new LumineEmbed()
                .setTitle("Erā ga arimasu! An error has occurred.")
                .setDescription("Input lah sebuah bilangan untuk di pangkatin");
            return message.channel.send(embed);
        }

        let embed = new LumineEmbed();

        try {
            embed.setTitle("Keisan kekka! Result");
            embed.addField("∻ Input", "`" + input + "`");
            embed.addField(
                "∻ Output",
                "`" + LumineMath.sederhanakan(input) + "`"
            );
            return message.channel.send(embed);
        } catch (err) {
            embed.setTitle("Keisan kekka! result.");
            embed.addField("∻ Input", "`" + input + "`");
            embed.addField(
                "∻ Output",
                "`Tidak bisa memproses kalkulasi tersebut. Please try again.`"
            );
            embed.addField("∻ Error log", "```js" + err + "```");
            return message.channel.send(embed);
        }
    },
};
