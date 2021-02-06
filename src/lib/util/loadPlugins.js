 const path = require('path');
const fs = require('fs');

function findFiles(folderPath){
    const files = []
    folderPath = path.isAbsolute(folderPath) ? folderPath : path.join(process.cwd(), folderPath)
    const folder = fs.readdirSync(folderPath, { withFileTypes: true })

    for(const file of folder){
        const pathFile = path.join(folderPath, file.name)
        if(file.isDirectory()){
            files.push(...findFiles(pathFile))
            continue
        }
        files.push(pathFile)
    }
    return files;
}

function folderHandler(handlerPath, fn){
    for(const file of findFiles(handlerPath)){
        try {
            const { dir, base } = path.parse(file)
            const props = require(file)
            fn(props, base, path.parse(dir).name)
             console.log(`[ PLUGINS ] Command ${file} successfully loaded !`)
        }catch(err) {
            console.error(`[ PLUGINS ] Command ${file} failed to load. ${err}`)
        }
    }
}

module.exports = async(client) => folderHandler('./src/lib/plugins', (props, file, folder) => {  client.stored.plugins.set(file.split('.')[0], props) });
