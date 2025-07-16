isActive = false;
function scrollToBottom() {
    if (!isActive) {
        isActive = true;
        const info = document.querySelector('#infoHeader');
        
        
        if (info) {
            info.scrollIntoView({ behavior: 'smooth' });
            addEventListener("scrollend", () => {
                info.classList.add('highlight-anim');
                info.addEventListener('animationend', () => {
                    info.classList.remove('highlight-anim');
                    isActive = false;
                });
            });
            
        }
    }
}