const LumineEmbed = require("../../lib/structures/bot/LumineEmbed");
const { default: axios } = require("axios");

module.exports = {
    name: "quotes",
    aliases: ["quote", "kutipan", "randomquotes", "randomquote"],
    description: "Menampilkan sebuah quote random.",
    category: "Entertaiment",
    cooldown: "5s",
    callback: ({ message }) => {
        const uri = "https://videfikri.com/api/randomquotes/";

        axios.get(uri).then((data) => {
            const embed = new LumineEmbed()
                .setTitle(data.data.result.author)
                .setDescription(data.data.result.quotes);
            return message.channel.send(embed);
        });
    },
};
