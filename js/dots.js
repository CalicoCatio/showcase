// Initialize
mainContent = document.body.querySelector('.main-content');


dotArray = [];
cursorX = 0;
cursorY = 0;
const DOT_COUNT = 75;
const MAX_SPEED = 3;
const MIN_SPEED = 2;
const MAX_DISTANCE_BETWEEN_CONNECTIONS = 100;

for (let i = 0; i < DOT_COUNT; i++) {
    addDot();
}

// Grab mouse pos
document.addEventListener('mousemove', (e) => {
    cursorX = e.clientX;
    cursorY = e.clientY;
});

// Add in a dot
function addDot() {
    const dot = document.createElement('span');
    dot.classList.add('background-dot');

    // Between an angle of 30 and -30 deg
    let dir = Math.floor(Math.random() * 361);

    dot.setAttribute('data-dot-direction', dir);

    dot.setAttribute('data-dot-speed', Math.random() * (MAX_SPEED - MIN_SPEED + 1)) + MIN_SPEED;
    dot.style.left = `${Math.floor(Math.random() * (mainContent.offsetWidth + 1))}px`;
    dot.style.top = `${Math.floor(Math.random() * (mainContent.offsetHeight + 1))}px`;

    mainContent.appendChild(dot);
    dotArray.push(dot);
}

function update() {

    // Check if next to cursor and move in oposite dir
    dotArray.forEach((dot) => {
        let distToCursor = Math.sqrt(Math.pow((cursorX - parseFloat(dot.style.left)), 2) + Math.pow((cursorY - parseFloat(dot.style.top)), 2));
        if (distToCursor < 50) {
            let dy = cursorY - parseFloat(dot.style.top);
            let dx = cursorX - parseFloat(dot.style.left)
            dot.setAttribute('data-dot-direction', Math.atan2(-dy, -dx) * (180 / Math.PI));
            dot.setAttribute('data-dot-speed', (Math.random() * (MAX_SPEED - MIN_SPEED)) + MIN_SPEED);
        }
    });


    // Move ball
    dotArray.forEach((dot, index) => {
        const left = parseFloat(dot.style.left);
        const top = parseFloat(dot.style.top);

        const directionDeg = Number(dot.getAttribute('data-dot-direction'));
        const speed = Number(dot.getAttribute('data-dot-speed'));

        const directionRad = directionDeg * (Math.PI / 180);

        const newLeft = left + Math.cos(directionRad) * speed;
        const newTop = top + Math.sin(directionRad) * speed;

        dot.style.left = `${newLeft}px`;
        dot.style.top = `${newTop}px`;

        // Offscreen? Add new
        if (parseFloat(dot.style.left) > mainContent.offsetWidth) {
            dot.remove();
            dotArray.splice(index, 1);
            addDot();
        }else if (parseFloat(dot.style.left) < 0) {
            dot.remove();
            dotArray.splice(index, 1);
            addDot();
        } else if (parseFloat(dot.style.top) > mainContent.offsetHeight) {
            dot.remove();
            dotArray.splice(index, 1);
            addDot();
        }
         else if (parseFloat(dot.style.top) < 0) {
            dot.remove();
            dotArray.splice(index, 1);
            addDot();
        }
    });

    // Draw lines
    dotArray.forEach((dot) => {
        
    });

    requestAnimationFrame(update);
}

requestAnimationFrame(update);