// Notify user if they are on a phone
function phoneModal() {
    const hasSeenModal = sessionStorage.getItem('hasSeenPhoneModal');

    if (hasSeenModal == true) return; // Don't show again if asked not to

    if (window.innerWidth < 998) {
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
        const modalDOM = document.querySelector('#phoneModal')

        // Hide scrollbar when modal is open
        modalDOM.addEventListener('show.bs.modal', function () {
            document.documentElement.style.overflow = 'hidden';
            document.body.style.paddingRight = `${window.getScrollbarWidth()}px`;
        });
        modalDOM.addEventListener('hide.bs.modal', function () {
            document.documentElement.style.overflow = '';
            document.body.style.paddingRight = 0;
        });
        modalDOM.addEventListener('hidden.bs.modal', function () {
            document.body.style.paddingRight = 0;
        });

        modal.show();

        // Mark as seen after it's shown
        dismissBtn.addEventListener('click', () => {
            sessionStorage.setItem('hasSeenPhoneModal', 'true');
        });
    }
}

window.addEventListener('load', phoneModal);