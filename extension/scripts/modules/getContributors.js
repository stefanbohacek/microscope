export default async (username, service) => {
    try {
        const requestURL = `https://stefanbohacek.com/microscope/?username=${username}&service=${service}`;
        await fetch(requestURL);

        const resp = await fetch(requestURL);
        const topContributors = await resp.json();
        return topContributors;
    } catch (error){
        console.log(error);
        return [];
    }
}