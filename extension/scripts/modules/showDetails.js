const showDetails = (data) => {
    if (data.representative.id){
        const userDescriptionSel = '[data-testid="UserDescription"]';
        const userDescriptionEl = document.querySelector(userDescriptionSel);

        if (userDescriptionEl){
            let containerEl = document.createElement('div');
            userDescriptionEl.appendChild(containerEl);
            containerEl.setAttribute('id', 'microscope-output-container');
            
            let resultHTML = '';
            
            if (data.contributors && data.contributors.length){
                const currencyFormat = new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                });

                const contributorsHTML = `<ul>
                ${data.contributors.map(contributor => `<li>
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
                    Learn more on <a class="r-1cvl2hr" href="https://www.govtrack.us/congress/members/${data.representative.id.govtrack}" target="_blank">GovTrack</a>.
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
