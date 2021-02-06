const ponos = require("./src/lib/classes/Core");
let main = new ponos()
 const ai = require("./src/lib/classes/AI");
const { start: AIstart } = new ai();
main.client.on("message", async (message)  => {
      if(message.author.bot) return;
      main.stored.plugins.get("execute")(main.client, message,main)
      if(message.channel.id === '732115887246671916')return;
         //AIstart(message.content,main).then(x => message.reply(x));
     });
    main.client.on("ready",  () => {
        console.log('a')
    })
 