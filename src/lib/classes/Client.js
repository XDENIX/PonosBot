const { Client  } = require("discord.js")
const discord = require("../extensions/discord");
 class client extends Client {
    constructor(opt) {
        super({
         ...discord
        });
        this.login()
     }
}
module.exports = client;