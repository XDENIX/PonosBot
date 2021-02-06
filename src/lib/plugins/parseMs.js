module.exports = async (ms) => {
const round = ms > 0 ? Math.floor : Math.ceil;

return {
    days: round(ms / 86400000),
    hours: round(ms / 3600000) % 24,
    minutes: round(ms / 60000) % 60,
    seconds: round(ms / 1000) % 60
};
}

/** 
* Author @MiracleUnona
* Author https://github.com/MiracleUnona
*/