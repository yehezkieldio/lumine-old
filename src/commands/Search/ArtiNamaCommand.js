const LumineEmbed = require("../../lib/structures/bot/LumineEmbed");
const { default: axios } = require("axios");

module.exports = {
    name: "artinama",
    aliases: ["nama"],
    description: "Menampilkan arti atau definisi dari sebuah nama.",
    category: "Search",
    minArgs: 1,
    maxArgs: -1,
    expectedArgs: "<nama>",
    callback: ({ message, args }) => {
        if (!args[0]) {
            const embed = new LumineEmbed()
                .setTitle("Erā ga arimasu! An error has occurred.")
                .setDescription(
                    "Input lah sebuah nama atau kata untuk di cari."
                );
            return message.channel.send(embed);
        }

        const uri = `https://videfikri.com/api/primbon/artinama/?nama=${encodeURIComponent(
            args.join(" ")
        )}`;

        axios.get(uri).then((data) => {
            const embed = new LumineEmbed()
                .setTitle(data.data.result.arti)
                .setDescription(data.data.result.desk);
            return message.channel.send(embed);
        });
    },
};
