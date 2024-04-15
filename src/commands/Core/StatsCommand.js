const LumineEmbed = require("../../lib/structures/bot/LumineEmbed");

const os = require("os");
const isWsl = require("is-wsl");
const { version } = require("../../../package.json");

const DiscordJS = require("discord.js");

module.exports = {
    name: "stats",
    aliases: ["statistics", "statistik", "botinfo", "bi"],
    description: "Menampilkan informasi statistik mengenai lumine.",
    category: "Core",
    cooldown: "5s",
    callback: ({ message, client }) => {
        let operatingSystem = "";

        if (os.type() === "Windows_NT") {
            operatingSystem += "Windows Environment";
        }

        if (os.type() === "Linux") {
            if (isWsl === true) {
                operatingSystem += "Linux Environment (WSL)";
            } else {
                operatingSystem += "Linux Environment";
            }
        }

        if (os.type() === "Darwin") {
            operatingSystem += "MacOS Enviroment";
        }

        const embed = new LumineEmbed()
            .setTitle(
                "Watashi no tōkei! " +
                    client.user.username +
                    "'s general information."
            )
            .addField(
                "∻ " + client.user.username + " Version",
                "`v" + version + "`",
                true
            )
            .addField(
                "∻ Discord.js Version",
                "`v" + DiscordJS.version + "`",
                true
            )
            .addField("∻ WOKCommands Version", "`v" + "1.2.8" + "`", true)
            .addField("∻ Node.js Version", "`" + process.version + "`", true)
            .addField(
                "∻ Memory Usage",
                "`" +
                    Math.round(process.memoryUsage().rss / 10485.76) / 100 +
                    "MB`",
                true
            )
            .addField("∻ Operating System", "`" + operatingSystem + "`", true);
        message.channel.send(embed);
    },
};
