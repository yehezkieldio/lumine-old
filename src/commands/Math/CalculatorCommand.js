const LumineEmbed = require("../../lib/structures/bot/LumineEmbed");
const LumineMath = require("../../lib/structures/utils/LumineMath");

module.exports = {
    name: "kalkulator",
    aliases: ["calculator", "calc"],
    description: "Melakukan kalkulasi bilangan layaknya kalkulator",
    category: "Math",
    minArgs: 1,
    maxArgs: -1,
    expectedArgs: "<equation>",
    cooldown: "5s",
    callback: ({ message, args }) => {
        let input = args.join(" ");

        let embed = new LumineEmbed();

        try {
            embed.setTitle("Keisan kekka! Calculator result.");
            embed.addField("∻ Input", "`" + input + "`");
            embed.addField(
                "∻ Output",
                "`" + LumineMath.limitedcalculate(input) + "`"
            );
            return message.channel.send(embed);
        } catch (err) {
            embed.setTitle("Keisan kekka! Calculator result.");
            embed.addField("∻ Input", "`" + input + "`");
            embed.addField(
                "∻ Output",
                "`Tidak bisa memproses kalkulasi tersebut. Please try again.\n`"
            );
            embed.addField("∻ Error log", "```js" + err + "```");
            return message.channel.send(embed);
        }
    },
};
