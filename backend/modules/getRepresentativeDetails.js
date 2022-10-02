const fs = require("fs");
const representatives = JSON.parse(fs.readFileSync("data/representatives.json"));

module.exports = async (username, service) => {
    let representative = {};
    try {
        for (let i = 0, j = representatives.length; i < j; i++){
            if (representatives[i].social[service] && representatives[i].social[service].includes(username.trim().toLowerCase())){
                representative = representatives[i];
                break;
            }
        }
        return representative;
    } catch (error) {
        console.log(error);
        return representative;
    }
}
