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

function insertModdedBreadcrumb(site) {
    if (!"onscrollend" in window) {
        window.throwToast('warn', "Outdated Browser Warning", "This page utilizes features that aren't supported by your browser. Don't worry, the feature is non-essential and has been automatically disabled.");
        console.warn(`OUTDATED BROWSER: Browser does not support 'scrollend' event listener.`);
        isActive = true;
        insertBreadcrumb('Home', 'href=/showcase/', 'Info', undefined, site);
    } else {
        insertBreadcrumb('Home', 'href=/showcase/', 'Info', `class="text-decoration-underline" style="cursor: pointer;" onclick="scrollToBottom();"`, site);
    }
}