require( 'dotenv' ).config();
const fetch = require('node-fetch');
const util = require('util');
const NodeCache = require("node-cache");
const contributorsCache = new NodeCache({stdTTL: 3600});

module.exports = async (representative) => {
    const opensecrets_id = representative.id.opensecrets;
    let topContributors = contributorsCache.get(opensecrets_id) || {};
    
    if (topContributors && topContributors.industries){
        return topContributors;
    } else {
        try {
            let requestURL, resp, data;

            requestURL = `https://www.opensecrets.org/api/?method=candContrib&apikey=${process.env.OPENSECRETS_API_KEY}&cid=${opensecrets_id}&output=json`;
            resp = await fetch(requestURL);
            data = await resp.json();
            console.log(util.inspect(data, false, null, true))
            topContributors.companies = data.response.contributors.contributor
                .map(contributor => contributor["@attributes"])
                .filter(contributor => contributor.pacs > 0)
                .slice(0, 5);

            requestURL = `https://www.opensecrets.org/api/?method=candIndustry&apikey=${process.env.OPENSECRETS_API_KEY}&cid=${opensecrets_id}&output=json`;
            resp = await fetch(requestURL);
            data = await resp.json();
            console.log(util.inspect(data, false, null, true))
            topContributors.industries = data.response.industries.industry
                .map(industry => industry["@attributes"])
                .filter(contributor => contributor.pacs > 0)
                .slice(0, 5);

            contributorsCache.set(representative.id.opensecrets, topContributors);
            return topContributors;
        } catch (error){
            console.log(error);
            return [];
        }
    }   
}
