isActive = false;
function scrollToBottom() {
    if (!isActive) {
        isActive = true;
        const info = document.querySelector('#infoHeader');
        const { top, left, bottom, right } = info.getBoundingClientRect();
        const { innerHeight, innerWidth } = window;
        
        if (info) {
            if ((top > 0 && top < innerHeight) && (left > 0 && left < innerWidth) && (bottom > 0 && bottom < innerHeight) && (right > 0 && right < innerWidth)) {
                info.classList.add('highlight-anim');

                const handler2 = () => {
                    window.removeEventListener("animationend", handler2);
                    info.classList.remove('highlight-anim');
                    isActive = false;
                }
                addEventListener("animationend", handler2);
            } else {
                info.scrollIntoView({ behavior: 'smooth' });
                const handler1 = () => {
                    window.removeEventListener("scrollend", handler1);

                    info.classList.add('highlight-anim');

                    const handler2 = () => {
                        window.removeEventListener("animationend", handler2);
                        info.classList.remove('highlight-anim');
                        isActive = false;
                    }
                    addEventListener("animationend", handler2);
                }
                addEventListener("scrollend", handler1);
            }
        }
    }
}

