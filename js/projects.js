// Notify user if they are on a phone
async function phoneModal() {
    const hasSeenModal = sessionStorage.getItem('hasSeenPhoneModal');

    if (hasSeenModal == true) return; // Don't show again if asked not to

    if (window.innerWidth < 768) {
        const modalHTML = `
        <div class="modal fade" id="phoneModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Warning!</h5>
                    </div>
                    <div class="modal-body">
                        Phones and other small devices will not be able to access all of this page's features, please use a larger display for full access.
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal" aria-label="Close">Okay</button>
                        <button type="button" id="dismissForever" class="btn btn-outline-danger" data-bs-dismiss="modal" aria-label="Close">Don't tell me again</button>
                    </div>
                </div>
            </div>
        </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        const modal = new bootstrap.Modal(document.querySelector('#phoneModal'));
        const dismissBtn = document.querySelector('#dismissForever');

        await window.sleep(100);

        modal.show();

        // Mark as seen after it's shown
        dismissBtn.addEventListener('click', () => {
            localStorage.setItem('hasSeenPhoneModal', 'true');
        });
    }
}

window.addEventListener('load', phoneModal);