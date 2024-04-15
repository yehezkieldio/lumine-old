const LumineEmbed = require("../../lib/structures/bot/LumineEmbed");
const LumineUtils = require("../../lib/structures/utils/LumineUtils");

module.exports = {
    name: "avatar",
    aliases: ["pfp", "av"],
    description: "Menampilkan avatar Discord kamu atau seseorang.",
    category: "Utility",
    minArgs: 0,
    maxArgs: -1,
    cooldown: "5s",
    callback: ({ message, args }) => {
        let user = args.length
            ? LumineUtils.resolveUsers(args.join(" "))
            : message.author;

        if (!user) {
            let embed = new LumineEmbed()
                .setTitle("Erā ga arimasu! An error has occurred.")
                .setDescription(
                    "Tidak dapat mencari avatar/pfp untuk **" +
                        args.join(" ") +
                        "**."
                );
            return message.channel.send(embed);
        }

        let avatar = user.displayAvatarURL({
            dynamic: true,
            size: 1024,
        });
        avatar = avatar.match(/.gif/) ? `${avatar}&f=.gif` : avatar;

        let embed = new LumineEmbed()
            .setTitle(LumineUtils.fullname(user) + "'s avatar.")
            .setImage(avatar)
            .setURL(
                user
                    .displayAvatarURL({
                        dynamic: true,
                        size: 1024,
                    })
                    .replace(/\?size=.*/, "")
            );
        return message.channel.send(embed);
    },
};
