const showDetails = (representative, contributors) => {
    if (representative.id){
        const userDescriptionSel = '[data-testid="UserDescription"]';
        const userDescriptionEl = document.querySelector(userDescriptionSel);

        if (userDescriptionEl){
            let containerEl = document.createElement('div');
            userDescriptionEl.appendChild(containerEl);
            containerEl.setAttribute('id', 'microscope-output-container');
            
            let resultHTML = '';

            
            if (contributors && contributors.length){
                const topContributors = contributors.splice(0, 3);

                const currencyFormat = new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                });

                const topContributorsHTML = `<ul>
                ${topContributors.map(contributor => `<li>
                        ${contributor['@attributes'].org_name} (${currencyFormat.format(contributor['@attributes'].total)})
                    </li>
                `).join('')}</ul>`;

                resultHTML += `
                <p>
                    <strong>Top donors</strong>
                </p>
                ${topContributorsHTML}
                `;
            }

            if (representative.id.govtrack){
                resultHTML += `
                <p>
                    Learn more on <a class="r-1cvl2hr" href="https://www.govtrack.us/congress/members/${representative.id.govtrack}" target="_blank">GovTrack</a>.
                </p>
                `;
            }
            
            containerEl.innerHTML = `
            ${resultHTML}
            `;
        } else {
            const target = document.querySelector('body');
            const observer = new MutationObserver(() => {
                if (document.querySelector(userDescriptionSel)) {
                    showDetails(representative, contributors);
                    observer.disconnect();
                }
            });
            const config = { childList: true };
            observer.observe(target, config);      
        }
    }
};

export default showDetails;
