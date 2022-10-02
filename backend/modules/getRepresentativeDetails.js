const fs = require("fs");
const representatives = JSON.parse(fs.readFileSync("data/representatives.json"));

module.exports = async (username, service) => {
    console.log('debug:representatives', representatives);
    console.log('debug:username, service', {username, service});
    let representative = {};
    try {
        for (let i = 0, j = representatives.length; i < j; i++){
            console.log(`debug:representatives[${i}].social`, representatives[i].social);
            if (representatives[i].social[service] && representatives[i].social[service].trim().toLowerCase() === username.trim().toLowerCase()){
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
