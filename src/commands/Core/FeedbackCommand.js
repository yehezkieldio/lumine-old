const LumineEmbed = require("../../lib/structures/bot/LumineEmbed");
const { version } = require("../../../package.json");

module.exports = {
    name: "feedback",
    aliases: ["feedbacks", "bugs", "bug"],
    description: "Menampilkan query dokumentasi Discord.js.",
    category: "Core",
    minArgs: 1,
    maxArgs: -1,
    expectedArgs: "<query>",
    callback: ({ message, args, client }) => {
        if (!args[0]) {
            const embed = new LumineEmbed()
                .setTitle("Erā ga arimasu! An error has occurred.")
                .setDescription("Input lah sebuah query untuk di kirim.");
            return message.channel.send(embed);
        }

        let embed = new LumineEmbed()
            .setTitle(
                "Fīdobakku o seijō ni sōshin suru! Sending your feeding back."
            )
            .setDescription(
                "Sukses mengirim feedback atau bug report kamu ke Developers kami."
            );
        message.channel.send(embed);

        try {
            let channel = message.client.channels.cache.get(
                "819300332940820501"
            );

            let embed = new LumineEmbed()
                .addField("∻ Query", "`" + args.join(" ") + "`", false)
                .addField("∻ Type", "`Feedback/Bugs`", true)
                .addField("∻ Sender", "`" + message.guild.name + "`", true)
                .setFooter(client.user.username + " Version: v" + version);
            return channel.send(embed);
        } catch (err) {
            let embed = new LumineEmbed()
                .setTitle("Erā ga arimasu! An error has occurred.")
                .setDescription(
                    "Tidak dapat mengirim feedback atau bug report kamu :("
                );
            return message.channel.send(embed);
        }
    },
};
