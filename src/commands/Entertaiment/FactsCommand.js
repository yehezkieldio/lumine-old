const LumineEmbed = require("../../lib/structures/bot/LumineEmbed");
const { default: axios } = require("axios");

module.exports = {
    name: "facts",
    aliases: ["fakta", "fact", "randomfacts", "randomfact", "randomfakta"],
    description: "Menampilkan fakta fakta secara random.",
    category: "Entertaiment",
    cooldown: "5s",
    callback: ({ message }) => {
        const uri = "https://videfikri.com/api/fakta";

        axios.get(uri).then((data) => {
            const embed = new LumineEmbed().setDescription(
                data.data.result.fakta
            );
            return message.channel.send(embed);
        });
    },
};
