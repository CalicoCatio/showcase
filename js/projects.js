// Notify user if they are on a phone
function phoneModal() {
    console.log("hi");
    const hasSeenModal = sessionStorage.getItem('hasSeenPhoneModal');

    if (hasSeenModal == true) return; // Don't show again if asked not to

    console.log("hello");

    if (window.innerWidth < 998) {
        console.log(":)");
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
        const myModal = new bootstrap.Modal(document.querySelector('#phoneModal'));
        const dismissBtn = document.querySelector('#dismissForever')
        myModal.show();

        // Mark as seen after it's shown
        dismissBtn.addEventListener('click', () => {
            sessionStorage.setItem('hasSeenPhoneModal', 'true');
        });
    }
}

window.addEventListener('load', phoneModal);