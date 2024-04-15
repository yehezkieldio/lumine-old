const LumineEmbed = require("../../lib/structures/bot/LumineEmbed");
const LumineMath = require("../../lib/structures/utils/LumineMath");

module.exports = {
    name: "pangkat",
    aliases: ["powers", "pow"],
    description: "Menghitung hasil pangkat sebuah bilangan",
    category: "Math",
    minArgs: 0,
    maxArgs: 2,
    expectedArgs: "<bilangan> <bilangan-pangkat>",
    cooldown: "5s",
    callback: ({ message, args }) => {
        if (!args[0]) {
            const embed = new LumineEmbed()
                .setTitle("Erā ga arimasu! An error has occurred.")
                .setDescription(
                    "Input lah sebuah bilangan untuk di sederhanakan"
                );
            return message.channel.send(embed);
        }

        let embed = new LumineEmbed();

        try {
            embed.setTitle("Keisan kekka! Result");
            embed.addField(
                "∻ Input",
                "`" + args[0] + " pangkat " + args[1] + "`"
            );
            embed.addField(
                "∻ Output",
                "`" + LumineMath.pangkat(args[0], args[1]) + "`"
            );
            return message.channel.send(embed);
        } catch (err) {
            embed.setTitle("Keisan kekka! result.");
            embed.addField(
                "∻ Input",
                "`" + args[0] + " pangkat " + args[1] + "`"
            );
            embed.addField(
                "∻ Output",
                "`Tidak bisa memproses kalkulasi tersebut. Please try again.`"
            );
            embed.addField("∻ Error log", "```js" + err + "```");
            return message.channel.send(embed);
        }
    },
};
