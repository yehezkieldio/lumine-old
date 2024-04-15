const LumineEmbed = require("../../lib/structures/bot/LumineEmbed");
const { default: axios } = require("axios");

module.exports = {
    name: "kbbi",
    aliases: [],
    description: "Mencari definisi atau query untuk KBBI.",
    category: "Search",
    minArgs: 1,
    maxArgs: -1,
    expectedArgs: "<query>",
    callback: ({ message, args }) => {
        if (!args[0]) {
            const embed = new LumineEmbed()
                .setTitle("Erā ga arimasu! An error has occurred.")
                .setDescription(
                    "Input lah sebuah query atau definisi untuk di cari."
                );
            return message.channel.send(embed);
        }

        const uri = `https://videfikri.com/api/kbbi/?query=${encodeURIComponent(
            args.join(" ")
        )}`;

        axios
            .get(uri)
            .then((data) => {
                if (data.data.result.hasil === undefined) {
                    const embed = new LumineEmbed()
                        .setTitle("Erā ga arimasu! An error has occurred.")
                        .setDescription(
                            "Tidak dapat mencari definisi untuk **" +
                                args.join(" ") +
                                "**."
                        );
                    return message.channel.send(embed);
                } else {
                    const embed = new LumineEmbed()
                        .setTitle(args.join(" ").toUpperCase())
                        .setDescription(data.data.result.hasil)
                        .setFooter(
                            "Powered by Kementerian Pendidikan dan Kebudayaan",
                            "https://upload.wikimedia.org/wikipedia/commons/a/a8/Seal_of_Ministry_of_Education_and_Culture_of_Indonesia.png"
                        );
                    return message.channel.send(embed);
                }
            })
            .catch((error) => {
                console.error(error);
                const embed = new LumineEmbed().setTitle(
                    "Erā ga arimasu! An error has occurred."
                );
                return message.channel.send(embed);
            });
    },
};
