 const config = { bot: "main",  text: null,  uid: null }
class AI {
    constructor(){}  
    async start(text,main){
        let resp = await response(text,main)
        return { 
            content: resp.text != null ? resp.text : { 
                embed: {
                     description: `\💔 An error occurred while generating a message.. Please try a little later or contact the bot administrator :(`
                } 
            }
        }
    }
}

response = async function(text,main) {
     config["text"] = text;
    let res = await main.rest.ai.api.send.post({
        body: JSON.stringify(config),
        headers: { 
            'Content-Type': 'application/json' 
        },  
        method: 'POST',
        mode: 'cors'
    }) 
    return res.status == 200 ? res.json() : { 
        ok: false, 
        text: null 
    };
}

module.exports = AI;