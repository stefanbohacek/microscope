import getRepresentativeDetails from './modules/getRepresentativeDetails.js';
import getContributors from './modules/getContributors.js';
import showDetails from './modules/showDetails.js';

getRepresentativeDetails().then(representative => {
    getContributors(representative).then(contributors => {
        showDetails(representative, contributors);
    });
});
