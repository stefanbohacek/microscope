require( 'dotenv' ).config();
const fetch = require('node-fetch');
const NodeCache = require("node-cache");
const contributorsCache = new NodeCache({stdTTL: 3600});

module.exports = async (representative) => {
    const opensecrets_id = representative.id.opensecrets;
    let topContributors = contributorsCache.get(opensecrets_id);

    if (topContributors){
        return topContributors;
    } else {
        try {
            const requestURL = `https://www.opensecrets.org/api/?method=candContrib&apikey=${process.env.OPENSECRETS_API_KEY}&cid=${opensecrets_id}&output=json`;
            const resp = await fetch(requestURL);
            const data = await resp.json();
            const topContributors = data.response.contributors.contributor.map(contributor => contributor["@attributes"]).slice(0, 5);
            contributorsCache.set(representative.id.opensecrets, topContributors);
            return topContributors;
        } catch (error){
            console.log(error);
            return [];
        }
    }
    
}
