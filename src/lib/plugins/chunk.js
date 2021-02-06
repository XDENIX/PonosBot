module.exports = async (str, size) => {
    return Array.from({ length: Math.ceil(str.length / size) }, (_, n) => str.slice(n * size, n * size + size));
}

/** 
* Author @MiracleUnona
* Author https://github.com/MiracleUnona
*/