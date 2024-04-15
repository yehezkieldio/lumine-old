const LumineUtils = require("../../lib/structures/utils/LumineUtils");
const os = require("os");

module.exports = {
    name: "uptime",
    aliases: [],
    description: "Menampilkan waktu online bot dan system host.",
    category: "Core",
    cooldown: "5s",
    callback: ({ message, client }) => {
        message.channel.send("Menghitung uptime...").then((resultMessage) => {
            resultMessage.edit(
                "Lumine uptime: **" +
                    LumineUtils.formatUptime(client.uptime) +
                    "**, Host uptime: **" +
                    LumineUtils.getSystemUptime(os.uptime()) +
                    "**."
            );
        });
    },
};
