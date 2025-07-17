isActive = false;
function scrollToBottom() {
    if (!isActive) {
        isActive = true;
        const info = document.querySelector('#infoHeader');
        
        
        if (info) {
            info.scrollIntoView({ behavior: 'smooth' });
            const handler1 = () => {

                window.removeEventListener("scrollend", handler1);
                

                info.classList.add('highlight-anim');

                const handler2 = () => {
                    window.removeEventListener("scrollend", handler2);
                    info.classList.remove('highlight-anim');
                    isActive = false;
                }
                addEventListener("animationend", handler2);
            }
            addEventListener("scrollend", handler1);
        }
    }
}

