const showDetails = (data) => {
    if (data.representative.id){
        const userDescriptionSel = '[data-testid="UserDescription"]';
        const userDescriptionEl = document.querySelector(userDescriptionSel);

        if (userDescriptionEl){
            let containerEl = document.createElement('div');
            userDescriptionEl.appendChild(containerEl);
            containerEl.setAttribute('id', 'microscope-output-container');
            
            let resultHTML = '';
            
            if (data.contributors && data.contributors.industries && data.contributors.industries.length){
                const currencyFormat = new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                });

                const contributorsHTML = `<ul>
                ${data.contributors.industries.map(contributor => `<li>
                        ${contributor.org_name} (${currencyFormat.format(contributor.total)})
                    </li>
                `).join('')}</ul>`;

                resultHTML += `
                <p>
                    <strong>Top donors</strong>
                </p>
                ${contributorsHTML}
                `;
            }

            if (data.representative.id.govtrack){
                resultHTML += `
                <p>
                    Learn more on
                        <a href="https://www.govtrack.us/congress/members/${data.representative.id.govtrack}" target="_blank">GovTrack</a>
                        and
                        <!-- <a href="https://www.opensecrets.org/search?q=${data.representative.id.opensecrets}" target="_blank">OpenSecrets</a>. -->
                        <a href="https://www.opensecrets.org/members-of-congress/summary?cid=${data.representative.id.opensecrets}" target="_blank">OpenSecrets</a>.
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
                    showDetails(data);
                    observer.disconnect();
                }
            });
            const config = { childList: true };
            observer.observe(target, config);      
        }
    }
};

export default showDetails;
