import getUsername from './modules/getUsername.js';
import getContributors from './modules/getContributors.js';
import showDetails from './modules/showDetails.js';

getUsername(window.location).then((info) => {
    getContributors(info.username, info.service).then(data => {
        showDetails(data);
    });
});
