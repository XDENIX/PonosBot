const { inspect } = require("util")
const Discord = require('discord.js')

module.exports = {
    name: 'eval',
    aliases: ["e","ebal"],
    using: `<code>`,
    cooldown: 0,
    async execute(client, message, args,main) {
        let embed = new Discord.MessageEmbed()
        const code = args.join(" ").replace(/(```(js)?)?/g, '');
        const token = client.token.split("").join("[^]{0,2}");
        const rev = client.token.split("").reverse().join("[^]{0,2}");
        const filter = new RegExp(`${token}|${rev}`, "g");
        try {
            let hrDiff;
            const hrStart = process.hrtime();
            hrDiff = process.hrtime(hrStart);
            let output = await eval(code);
            let asd = output;
            if (output instanceof Promise || (Boolean(output) && typeof output.then === "function" && typeof output.catch === "function")) output = await output;
            output = inspect(output, { depth: 0, maxArrayLength: null });
            output = output.replace(filter, "[TOKEN]");
            output = clean(output);
            if (output.length < 1950) {
                message.channel.send(`\`\`\`fix\nOutput type: ${typeof asd}\nExecution time: ${hrDiff[0] > 0 ? `${hrDiff[0]}s ` : ''}${hrDiff[1] / 1000000}ms\nOutput:\`\`\`\n\`\`\`json\n\n${output}\n\`\`\``);
                message.react("✅")
            } else {
                message.channel.send(`${output}`, { split: "\n", code: "js" });
            }
        } catch (error) {
            message.channel.send(`Error \`\`\`js\n${error}\`\`\``);
            message.react("❎")
        }

       function clean(text) {
            return text
                .replace(/`/g, "`" + String.fromCharCode(8203))
                .replace(/@/g, "@" + String.fromCharCode(8203));
        }
    },
    public: false,
}
