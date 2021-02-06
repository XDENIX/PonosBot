class BotCommand {
    constructor(data) {
        for(let field in data) {
            if(field == 'execute'){

            }else{
                this[field] = data[field];
            }
        }
        this.execute = (...args) => {
            delete require.cache[require.resolve(`../commands/${this.module}/${String(this.name)}`)];
            require(`../commands/${this.module}/${String(this.name)}`).execute(...args);
        }
    }
}

module.exports = BotCommand;
