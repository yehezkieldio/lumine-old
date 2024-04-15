const LumineEmbed = require("../../lib/structures/bot/LumineEmbed");

module.exports = {
    name: "help",
    aliases: ["?", "h"],
    description: "Menampilkan informasi mengenai Lumine.",
    category: "Core",
    minArgs: 0,
    maxArgs: 1,
    expectedArgs: "[command name | command alias]",
    cooldown: "5s",
    callback: ({ message, args, client, instance }) => {
        const { guild } = message;

        const currentGuild = guild.id;
        const rplGuild = "734601289450651658";

        if (!args[0]) {
            const embed = new LumineEmbed()
                .setTitle(
                    "Konnichiwassup! " + client.user.username + "'s help menu."
                )
                .addField(
                    "∻ Prefix",
                    "Prefix untuk **" +
                        guild.name +
                        "** adalah `" +
                        instance.getPrefix(guild) +
                        "`.\n" +
                        "`" +
                        instance.getPrefix(guild) +
                        "NamaCommand` untuk menggunakan command."
                )
                .addField(
                    "∻ Commands",
                    "Anda dapat melihat daftar commands yang tersedia melewati `" +
                        instance.getPrefix(guild) +
                        "commands`!\n" +
                        "`" +
                        instance.getPrefix(guild) +
                        "help <NamaCommand>` untuk informasi dari command tersebut."
                )
                .addField("∻ Development", "Developer(s): `izu#4253`");

            if (currentGuild === rplGuild) {
                embed.setDescription(
                    "**Lumine** adalah multipurpose asssisting bot untuk server rpl smkn-2 balikpapan!\nDitulis dalam bahasa **[Javascript](https://www.javascript.com)** oleh **Yehezkiel Dio**."
                );
            }

            return message.channel.send(embed);
        } else {
            getCommandInfo(args[0]);
        }

        function getCommandInfo(cmd) {
            const command = instance.commandHandler.getCommand(`${cmd}`);
            console.log(command);

            if (command === undefined) {
                const embed = new LumineEmbed()
                    .setTitle("Erā ga arimasu! An error has occurred.")
                    .setDescription(
                        "**" + args[0] + "** adalah command yang tidak valid!"
                    );
                return message.channel.send(embed);
            }

            let aliases = [];
            if (command.names.length) {
                aliases += "`" + command.names.join(", ") + "`";
            }

            const commandName = command.names.shift();

            let commandArguments = command.expectedArgs;
            if (
                typeof commandArguments === "undefined" ||
                commandArguments === null
            ) {
                commandArguments = "";
            }

            const embed = new LumineEmbed()
                .setAuthor(client.user.username, client.user.avatarURL())
                .setTitle(instance.getPrefix(guild) + commandName)
                .setDescription("" + command.description + "\n")
                .addField("∻ Aliases", aliases)
                .addField(
                    "∻ Usage",
                    "`" +
                        instance.getPrefix(guild) +
                        commandName +
                        " " +
                        commandArguments +
                        "`"
                );

            return message.channel.send(embed);
        }
    },
};
