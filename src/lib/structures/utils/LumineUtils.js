/* eslint-disable no-useless-escape */
const client = require("../../../index");

function formatUptime(milliseconds) {
    let day, hour, minute, seconds;
    seconds = Math.floor(milliseconds / 1000);
    minute = Math.floor(seconds / 60);
    seconds = seconds % 60;
    hour = Math.floor(minute / 60);
    minute = minute % 60;
    day = Math.floor(hour / 24);
    hour = hour % 24;

    if (day)
        return `${day} hari, ${hour} jam, ${minute} menit, ${seconds} detik`;
    if (hour) return `${hour} jam, ${minute} menit, ${seconds} detik`;
    if (minute) return `${minute} menit, ${seconds} detik`;
    return `${seconds} detik`;
}

function formatToMiliseconds(seconds) {
    return seconds * 1000;
}

function getSystemUptime(systemUptime) {
    return formatUptime(formatToMiliseconds(systemUptime));
}

function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

let cleanRegex = new RegExp("([_*`])", "g");
let matchEmojiRegex = new RegExp(/<:[a-zA-Z0-9_-]+:(\d{18})>/);

function regEscape(str) {
    return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
}

function clean(str) {
    return str.replace(cleanRegex, "\\$&");
}

function fullname(user, escape = true) {
    user = user.user || user;

    const discrim = user.discriminator || user.discrim;
    let username = user.username || user.name;

    if (!username) {
        return user.id;
    }

    username = this.clean(username);

    if (escape) {
        username
            .replace(/\\/g, "\\\\")
            .replace(/`/g, `\`${String.fromCharCode(8203)}`);
    }

    return `${username}#${discrim}`;
}

function resolveUsers(user, exact) {
    if (!user) return null;

    // * resolves mentions ~ @izu#4253
    const regex = exact ? "<@!?([0-9]+)>$" : "<@!?([0-9]+)>";
    const mentionId = new RegExp(regex, "g").exec(user);
    if (mentionId && mentionId.length > 1) {
        return client.users.cache.find((u) => u.id === mentionId[1]);
    }

    // * resolve username#0001 ~ izu#4253
    if (user.indexOf("#") > -1) {
        const [name, discrim] = user.split("#");
        const nameDiscrimSearch = client.users.cache.find(
            (u) => u.username === name && u.discriminator === discrim
        );
        if (nameDiscrimSearch) {
            return nameDiscrimSearch;
        }
    }

    // * resolve id ~ 327849142774923266
    if (user.match(/^([0-9]+)$/)) {
        const userIdSearch = client.users.cache.find((u) => u.id === user);
        if (userIdSearch) {
            return userIdSearch;
        }
    }

    // * resolve wildcard username ~ izu
    const exactNameSearch = client.users.cache.find((u) => u.username === user);
    if (exactNameSearch) {
        return exactNameSearch;
    }

    if (!exact) {
        const escapedUser = regEscape(user);
        const userNameSearch = client.users.cache.find(
            (u) =>
                u.username.match(new RegExp(`^${escapedUser}.*`, "i")) !=
                undefined
        );
        if (userNameSearch) {
            return userNameSearch;
        }
    }

    return null;
}

function resolveEmojis(argument, message) {
    // * check if emoji is animated and a default emoji
    if (argument.startsWith("<a:"))
        return "Command ini tidak mendukung animated emoji";
    if (argument.charCodeAt(0) >= 55296)
        return argument + " adalah emoji biasa Discord.";

    // * validate emoji
    const match = argument.match(matchEmojiRegex);
    if (!match || !match[1])
        return "Berikanlah emoji valid! Pastikan Lumine berada di server kamu.";

    // * find the emoji
    let emoji = message.guild.emojis.cache.find(
        (emoji) => emoji.id == match[1]
    );
    if (!emoji)
        return "Berikanlah emoji valid! Pastikan Lumine berada di server kamu.";

    return emoji;
}

function resolveURLs(title, url, display) {
    return `[${title}](${url.replace(/\)/g, "%27")}${
        display ? ` "${display}"` : ""
    })`;
}

function shorten(text, maxLen = 2000) {
    return text.length > maxLen ? `${text.substr(0, maxLen - 3)}...` : text;
}

module.exports = {
    formatUptime,
    getSystemUptime,
    formatToMiliseconds,
    formatBytes,
    regEscape,
    clean,
    fullname,
    resolveUsers,
    resolveEmojis,
    resolveURLs,
    shorten,
};
