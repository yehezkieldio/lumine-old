/* eslint-disable no-unused-vars */
const { default: axios } = require("axios");
const LumineEmbed = require("../../lib/structures/bot/LumineEmbed");
const LumineUtils = require("../../lib/structures/utils/LumineUtils");
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

module.exports = {
    name: "changelog",
    aliases: ["changelogs"],
    description:
        "Menampilkan perubahan terbaru kepada Lumine lewait repository GitHub",
    category: "Core",
    cooldown: "5s",
    callback: ({ message }) => {
        const url = `https://api.github.com/repos/LichKing112/Lumine/commits`;
        const axiosAuth = {
            headers: {
                Authorization: `Token ${GITHUB_TOKEN}`,
            },
        };

        async function getCommits(url, authorization) {
            axios.get(url, authorization).then(({ data }) => {
                let commits = data.slice(0, 5);
                let embed = new LumineEmbed()
                    .setTitle("Lumine's latest commit.")
                    .setDescription(
                        commits.map((commit) => {
                            const hash = LumineUtils.resolveURLs(
                                `\`${commit.sha.slice(0, 7)}\``,
                                commit.html_url,
                                false
                            );
                            return `${hash} ${LumineUtils.shorten(
                                commit.commit.message.split("\n")[0],
                                50
                            )} - ${commit.author.login}`;
                        })
                    );
                return message.channel.send(embed);
            });
        }
        getCommits(url, axiosAuth);
    },
};
