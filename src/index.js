/**
 * @file index.js - root entry point for lumine discord bot application
 * @author Liz <LichKing112>
 * @version 1.0.0
 * @copyright Liz 2021
 * @license MIT
 */

require("events").EventEmitter.prototype._maxListeners = 100;
require("dotenv").config();

const PREFIX = process.env.PREFIX;
const TOKEN = process.env.TOKEN;
const MONGO_URI = process.env.MONGO_URI;

const DiscordJS = require("discord.js");
const WOKCommands = require("wokcommands");

const client = new DiscordJS.Client({
    disableMentions: "everyone",
    partials: ["MESSAGE", "REACTION"],
});

client.on("ready", () => {
    const messagesPath = "";

    const disabledDefaultCommands = [
        "help",
        "command",
        "language",
        "prefix",
        "requiredrole",
    ];

    new WOKCommands(client, {
        commandsDir: "commands",
        featureDir: "listeners",
        messagesPath,
        showWarns: true,
        disabledDefaultCommands,
    })
        .setDefaultPrefix(PREFIX)
        .setMongoPath(MONGO_URI)
        .setBotOwner(["327849142774923266"])
        .setCategorySettings([
            {
                name: "Core",
                emoji: "🎮",
            },
            {
                name: "Utility",
                emoji: "✒️",
            },
            {
                name: "Entertaiment",
                emoji: "😎",
            },
            {
                name: "Search",
                emoji: "🔍",
            },
            {
                name: "Math",
                emoji: "📐",
            },
            {
                name: "Schoolwork",
                emoji: "🏫",
            },
            {
                name: "Developer",
                emoji: "💻",
            },
            {
                name: "Configuration",
                emoji: "🚧",
                hidden: true,
            },
        ]);
});

client.login(TOKEN);

module.exports = client;
