export default async (username, service) => {
    console.log('debug', username, service);
    try {
        const requestURL = `https://stefanbohacek.com/microscope/?username=${username}&service=${service}`;
        console.log('debug:requestURL', requestURL);
        await fetch(requestURL);

        const resp = await fetch(requestURL);
        console.log('debug:resp', resp);
        const topContributors = await resp.json();
        console.log('debug:topContributors', topContributors);
        return topContributors;
    } catch (error){
        console.log(error);
        return [];
    }
}