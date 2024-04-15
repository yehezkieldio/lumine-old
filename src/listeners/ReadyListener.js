const os = require("os");
const getos = require("getos");
const isWsl = require("is-wsl");

module.exports = (client) => {
    const statusArray = ["ily <3 | m,help"];

    setInterval(function () {
        client.user.setActivity(
            `${statusArray[~~(Math.random() * statusArray.length)]}`,
            {
                type: "WATCHING",
            }
        );
    }, 50000);

    let readyState = "";

    if (os.type() === "Windows_NT") {
        readyState +=
            "Menjalankan " +
            client.user.tag +
            " di " +
            "Windows Environment" +
            " " +
            os.release() +
            ".";
    }

    if (os.type() === "Linux") {
        if (isWsl === true) {
            getos(function (e, os) {
                if (e) return console.log(e);
                readyState +=
                    "Menjalankan " +
                    client.user.tag +
                    " di " +
                    "Linux Environment (WSL)" +
                    " " +
                    os.dist +
                    " " +
                    os.release +
                    ".";
            });
        } else {
            getos(function (e, os) {
                if (e) return console.log(e);
                readyState +=
                    "Menjalankan " +
                    client.user.tag +
                    " di " +
                    "Linux Environment" +
                    " " +
                    os.dist +
                    " " +
                    os.release +
                    ".";
            });
        }
    }

    if (os.type() === "Darwin") {
        readyState +=
            "Menjalankan " + client.user.tag + " di " + "MacOS Environment";
    }

    console.log(readyState);
};

module.exports.config = {
    displayName: "ReadyListener",
    dbName: "LumineReady",
    loadDBFirst: false,
};
