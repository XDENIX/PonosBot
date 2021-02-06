const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
module.exports = async (client, message,main) => {
    const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex('!')})\\s*`);
    if (!prefixRegex.test(message.content)) return;
    if('!'.length <= 0 && '!'.length <= 0) return;

    const args = message.content.slice('!'.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = main.stored.commands.get(commandName) || main.stored.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));
    if (command == null || command == undefined) return;
    if(command.hidden == true || command.public == false && !['805089428690698241'].includes(message.author.id)) return;
 
    // колдаун 
    setTimeout(() => main.stored.cooldowns.delete(`${command.name.toUpperCase()}:${message.author.id}`), command.cooldown * 1000)
    if(main.stored.cooldowns.has(`${command.name.toUpperCase()}:${message.author.id}`)) return message.react("⏱️")

    try {
        await command.execute(client, message,args,main);
        main.stored.cooldowns.set(`${command.name.toUpperCase()}:${message.author.id}`,{key: `${command.name.toUpperCase()}:${message.author.id}`})

    } catch (err){
        
     }

 };