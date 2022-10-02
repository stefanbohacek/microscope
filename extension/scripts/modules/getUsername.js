export default async (location) => {
    if (!location){
        return null;
    }

    const service = location.hostname.split('.')[0];

    switch (service) {
        case 'twitter':
            const match = location.href.match(/^https?:\/\/(www\.)?twitter.com\/@?(?<handle>\w+)/);
            const username = match?.groups?.handle ? match.groups.handle : null;
            return {username, service};
            break;
    }
}
