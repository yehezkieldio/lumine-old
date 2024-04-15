/* eslint-disable no-unused-vars */
const LumineEmbed = require("../../lib/structures/bot/LumineEmbed");
const LumineUtils = require("../../lib/structures/utils/LumineUtils");

const OWNERID = process.env.OWNER_ID;

const hastebin = require("hastebin");
const os = require("os");

module.exports = {
    name: "eval",
    aliases: ["evaluate", "js"],
    description: "Mengevaluasi code javascript.",
    category: "Developer",
    ownerOnly: true,
    minArgs: 1,
    maxArgs: -1,
    expectedArgs: "<code>",
    callback: ({ message, args, client, instance }) => {
        if (!args[0]) {
            const embed = new LumineEmbed()
                .setAuthor(client.user.username, client.user.avatarURL())
                .setTitle("Go shitei kudasai!")
                .setDescription("Silakan input code untuk di evalute.");
            return message.channel.send(embed);
        } else {
            const clean = (text) => {
                if (typeof text === "string") {
                    return text
                        .replace(/`/g, "`" + String.fromCharCode(8203))
                        .replace(/@/g, "@" + String.fromCharCode(8203))
                        .replace(client.token, "<TOKEN>");
                } else {
                    return text;
                }
            };

            const embed = new LumineEmbed().setTitle(
                "Kōdo hyōka! Evaluate code."
            );

            try {
                const code = args.join(" ");
                let evaled = eval(code);
                const type = typeof evaled;

                if (typeof evaled !== "string") {
                    evaled = require("util").inspect(evaled);
                    const result = clean(evaled);

                    if (result.length > 1024) {
                        hastebin
                            .createPaste(
                                result,
                                {
                                    aw: true,
                                    contentType: "text/plain",
                                    server: "https://hastebin.com",
                                },
                                {}
                            )
                            .then(function (urlToPaste) {
                                return message.channel.send(urlToPaste);
                            })
                            .catch(function (requestError) {
                                console.error(requestError);
                            });
                    } else {
                        embed.addField("∻ Input", "```js\n" + code + "\n```");
                        embed.addField(
                            "∻ Output",
                            "```js\n" + result + "\n```"
                        );
                        embed.addField("∻ Typeof", "```js\n" + type + "\n```");
                        return message.channel.send(embed);
                    }
                }
            } catch (err) {
                console.log(err);
                embed.addField("∻ Error", "```js\n" + clean(err) + "\n```");
                return message.channel.send(embed);
            }
        }
    },
};
