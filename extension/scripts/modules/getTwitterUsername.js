export default (url) => {
    if (!url){
        return null;
    }
    const match = url.match(/^https?:\/\/(www\.)?twitter.com\/@?(?<handle>\w+)/);
    return match?.groups?.handle ? match.groups.handle : null;
}