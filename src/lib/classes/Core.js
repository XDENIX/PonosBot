const { Collection,Structures } = require("discord.js");
const Client = require("./Client");
const RESTManager = require("../Rest/RESTManager");
const { parse: parseYaml } = require("yaml");
const { readFileSync } = require("fs");
const TelegramBot = require('node-telegram-bot-api'); 
Structures.extend('Message', require("../extensions/MessageReply"));

class Core {
  constructor(opt) {
    this.client = new Client();
    this.database = {};
    this.config = parseYaml(readFileSync("./src/config.yml", "utf8"));
    this.stored = {
      cooldowns: new Collection(),
      queue: new Collection(),
      commands: new Collection(),
      modules: new Collection(),
      aliases: new Collection(),
      plugins: new Collection()
    }
    
    this.telegram = new TelegramBot('', { polling: true});  

    this.rest = {
      kyaru: new RESTManager("https://api.kyaru-dev.ml", {
        headers: {
           "Authorization": ``
        }}),
      astellia: new RESTManager("https://astellia.club/api"),
      telegram: new RESTManager(`https://api.telegram.org`),
      SHIELDAPI: new RESTManager(""),
      ai: new RESTManager(""),
      miss: new RESTManager("https://miss-api.ml", {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `User `,
        }
      })
    }
    require("../util/loadCommands")(this);
    require("../util/loadPlugins")(this);

  }
}
module.exports = Core;