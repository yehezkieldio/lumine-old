const LumineEmbed = require("../../lib/structures/bot/LumineEmbed");

module.exports = {
    name: "invite",
    aliases: ["inv", "add"],
    description: "Menampilkan link invite Lumine.",
    category: "Core",
    cooldown: "5s",
    callback: ({ message }) => {
        let embed = new LumineEmbed()
            .setTitle("Shōmei o shōtai shite kudasai! Invite Lumine.")
            .setDescription(
                "Invite lumine [disini](https://discord.com/oauth2/authorize?client_id=815339967319900190&scope=bot&permissions=2147483639)"
            );
        return message.channel.send(embed);
    },
};
