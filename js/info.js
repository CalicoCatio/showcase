isActive = false;
function scrollToBottom() {
    if (!isActive) {
        isActive = true;
        const info = document.querySelector('#infoHeader');
        
        
        if (info) {
            info.scrollIntoView({ behavior: 'smooth' });
            const listen1 = addEventListener("scrollend", () => {
                listen1.remove();
                info.classList.add('highlight-anim');
                const listen2 = info.addEventListener('animationend', () => {
                    listen2.remove();
                    info.classList.remove('highlight-anim');
                    isActive = false;
                });
            });
            
        }
    }
}