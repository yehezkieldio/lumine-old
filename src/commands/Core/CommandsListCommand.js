const LumineEmbed = require("../../lib/structures/bot/LumineEmbed");
const OWNERID = process.env.OWNER_ID;

module.exports = {
    name: "commands",
    aliases: ["cmds"],
    description: "Menampilkan daftar commands yang tersedia.",
    category: "Core",
    cooldown: "5s",
    callback: ({ message, client, instance }) => {
        let { guild } = message;

        // let currentGuild = guild.id;
        // let rplGuild = '734601289450651658';

        let coreCommands = [];
        let entertaimentCommands = [];
        let searchCommands = [];
        let utilityCommands = [];
        let mathCommands = [];
        // let schoolworkCommands = [];
        let developerCommands = [];

        instance.commandHandler
            .getCommandsByCategory("Core")
            .forEach((command) => {
                coreCommands += "`" + command.names.shift() + "` ";
            });

        instance.commandHandler
            .getCommandsByCategory("Entertaiment")
            .forEach((command) => {
                entertaimentCommands += "`" + command.names.shift() + "` ";
            });

        instance.commandHandler
            .getCommandsByCategory("Search")
            .forEach((command) => {
                searchCommands += "`" + command.names.shift() + "` ";
            });

        instance.commandHandler
            .getCommandsByCategory("Utility")
            .forEach((command) => {
                utilityCommands += "`" + command.names.shift() + "` ";
            });

        instance.commandHandler
            .getCommandsByCategory("Math")
            .forEach((command) => {
                mathCommands += "`" + command.names.shift() + "` ";
            });

        instance.commandHandler
            .getCommandsByCategory("Developer")
            .forEach((command) => {
                developerCommands += "`" + command.names.shift() + "` ";
            });

        let embed = new LumineEmbed()
            .setTitle(
                "Koko ni arimasu! " + client.user.username + "'s command list."
            )
            .setDescription(
                "`" +
                    instance.getPrefix(guild) +
                    "NamaCommand` untuk menggunakan command.\n" +
                    "`" +
                    instance.getPrefix(guild) +
                    "help <NamaCommand>` untuk informasi dari command tersebut."
            )
            .addField("∻ Core", coreCommands)
            .addField("∻ Entertaiment", entertaimentCommands)
            .addField("∻ Search", searchCommands)
            .addField("∻ Math", mathCommands)
            .addField("∻ Utility", utilityCommands);

        // if (currentGuild === rplGuild) {
        //     embed.addField("∻ Schoolwork", "```" + schoolworkCommands + "```", true);
        // }

        if (message.author.id === OWNERID) {
            embed.addField("∻ Developer", developerCommands);
        }

        return message.channel.send(embed);
    },
};
