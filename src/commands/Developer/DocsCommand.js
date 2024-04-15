const LumineEmbed = require("../../lib/structures/bot/LumineEmbed");
const { default: axios } = require("axios");

module.exports = {
    name: "docs",
    aliases: ["discordjs", "djs"],
    description: "Menampilkan query dokumentasi Discord.js.",
    category: "Developer",
    ownerOnly: true,
    minArgs: 1,
    maxArgs: -1,
    expectedArgs: "<query>",
    callback: ({ message, args }) => {
        if (!args[0]) {
            const embed = new LumineEmbed()
                .setTitle("Erā ga arimasu! An error has occurred.")
                .setDescription("Input lah sebuah query untuk di cari.");
            return message.channel.send(embed);
        }

        const uri = `https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(
            args
        )}`;

        axios.get(uri).then((embed) => {
            const { data } = embed;
            console.log(data);

            if (data && !data.error) {
                message.channel.send({ embed: data });
            } else {
                const embed = new LumineEmbed()
                    .setTitle("Erā ga arimasu! An error has occurred.")
                    .setDescription(
                        "Tidak dapat mencari dokumentasi mengenai **" +
                            args.join(" ") +
                            "**."
                    );
                return message.channel.send(embed);
            }
        });
    },
};
