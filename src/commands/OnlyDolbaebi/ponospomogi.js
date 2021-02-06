 module.exports = {
    name: "ponospomogi",
    aliases: [],
    cooldown: 10,

    async execute(client, message, args,main) {
 message.reply(`ИДИ НАХУЙ КЛОУН,${main.stored.commands.map(h=>h.name)}`)
}
};