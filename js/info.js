isActive = false;
function scrollToBottom() {
    if (!isActive) {
        isActive = true;
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
        });
        const info = document.querySelector('#infoHeader');
        if (info) {
            info.classList.add('highlight-anim');
            info.addEventListener('animationend', () => {
                info.classList.remove('highlight-anim');
                isActive = false;
            });
        }
    }
}