 module.exports = async (array, n, insertNumber = false) => {
        n = +n;
        const word = array[n % 10 == 1 && n % 100 != 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2];
        return insertNumber ? `${n} ${word}` : word;
    }

/** 
* Author @MiracleUnona
* Author https://github.com/MiracleUnona
*/