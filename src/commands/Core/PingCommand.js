module.exports = {
    name: "ping",
    aliases: ["latency"],
    description: "Menampilkan response time ping latency bot dan discord api.",
    category: "Core",
    cooldown: "5s",
    callback: ({ message, client }) => {
        message.channel.send("Menghitung ping...").then((resultMessage) => {
            const ping =
                resultMessage.createdTimestamp - message.createdTimestamp;

            resultMessage.edit(
                "Bot latency: **" +
                    ping +
                    "ms**, API latency: **" +
                    client.ws.ping +
                    "ms**."
            );
        });
    },
};
