import getUsername from './modules/getUsername.js';
import getContributors from './modules/getContributors.js';
import showDetails from './modules/showDetails.js';

getUsername(window.location).then((info) => {
    console.log('debug:getUsername', info);
    getContributors(info.username, info.service).then(data => {
        console.log('debug:getContributors', data);
        showDetails(data);
    });
});
