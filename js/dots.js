// Initialize
mainContent = document.body.querySelector('.main-content');
canvas = document.createElement('canvas');
canvas.style.position = 'absolute';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.zIndex = '-10';
canvas.id = 'dotsCanvas';
canvas.style.padding = '0';
canvas = mainContent.appendChild(canvas);
ctx = canvas.getContext("2d");

dotArray = [];
lineArray = [];
cursorX = 0;
cursorY = 0;
MIN_DIST_TO_MOUSE = 75;
DOT_COUNT = Math.floor(Math.max(canvas.width / 20, canvas.height / 20));
MAX_SPEED = 2;
MIN_SPEED = 1;
MAX_DISTANCE_BETWEEN_CONNECTIONS = 100;

lastTime = performance.now();
frameCount = 0;
deltaTime = 0;

// Resize canvas
function canvasResize() {
    const dpr = window.devicePixelRatio || 1;
    if (!(document.documentElement.style.overflow == 'hidden')) {
        canvas.width = mainContent.offsetWidth;
        canvas.style.top = '0px';
    } 
    else {
        canvas.width = mainContent.offsetWidth + window.getScrollbarWidth();
        canvas.style.top = `${document.body.querySelector('.navbar').offsetHeight}px`;
    }
    canvas.height = mainContent.offsetHeight;

    DOT_COUNT = Math.max(canvas.width/25, canvas.height/25);
}

canvasResize();
window.addEventListener('resize', canvasResize);
// Since accordions can change canvas size and don't trigger the above listener, another trigger is needed
document.querySelectorAll('.accordion-collapse').forEach(item => {
    item.addEventListener('shown.bs.collapse', canvasResize);
    item.addEventListener('hidden.bs.collapse', canvasResize);
});

// Check for when scrollbar is removed (it gets removed for modals)
observer = new MutationObserver(() => {
    const overflow = window.getComputedStyle(document.documentElement).overflow;
    if (overflow === 'hidden') {
        canvasResize();
    } else {
        canvasResize();
    }
});

observer.observe(document.documentElement, { attributes: true, attributeFilter: ['style'] });

// Grab mouse pos
document.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    cursorX = e.clientX - rect.left;
    cursorY = e.clientY - rect.top;
});

// Add in the dots
for (let i = 0; i < DOT_COUNT; i++) {
    addDot();
}

// Add in a dot
function addDot() {
    let dot = {};
    dot.x = Math.random() * mainContent.offsetWidth + 1;
    dot.y = Math.random() * mainContent.offsetHeight + 1;
    dot.radius = Math.min(window.screen.width / 300, window.screen.height / 300);
    dot.directionDeg = Math.random() * 360 + 1;
    dot.speed = Math.random() * (MAX_SPEED - MIN_SPEED) + MIN_SPEED;
    dot.opacity = 0;
    drawDot(dot);
    dotArray.push(dot);
}

function update() {
    // Add/remove dots
    if (DOT_COUNT > dotArray.length) {
        for (let i = dotArray.length; i < DOT_COUNT; i++) {
            addDot();
        }
    } else if (DOT_COUNT < dotArray.length) {
        dotArray.splice(DOT_COUNT, dotArray.length - DOT_COUNT);
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Check if next to cursor and move in oposite dir (no detection for touchscreens due to how touch and hold is handled)
    if (!window.isTouchDevice()) {
        dotArray.forEach((dot) => {
            const dotX = dot.x;
            const dotY = dot.y;
            let distToCursor = Math.sqrt(Math.pow((cursorX - dotX), 2) + Math.pow((cursorY - dotY), 2));
            if (distToCursor < MIN_DIST_TO_MOUSE) {
                let dy = cursorY - dotY;
                let dx = cursorX - dotX;
                dot.directionDeg = Math.atan2(-dy, -dx) * (180 / Math.PI);
                dot.speed = Math.min(Math.abs(distToCursor - 50) + 1, MAX_SPEED * 2);
            }
        });
    }
    

    // Move dot
    const scrollWidth = window.getScrollbarWidth();
    dotArray.forEach((dot, index) => {
        const dotX = dot.x;
        const dotY = dot.y;
        const directionRad = dot.directionDeg * (Math.PI / 180);
        let dotspeed = dot.speed;
        const dotRadius = dot.radius

        const newX = dotX + Math.cos(directionRad) * dotspeed;
        const newY = dotY + Math.sin(directionRad) * dotspeed;

        dot.x = newX;
        dot.y = newY;

        // If screen size changes, the dot size has to, too.
        dot.radius = Math.min(window.screen.width / 300, window.screen.height / 300);

        // Offscreen? Add new
        if (newX > mainContent.offsetWidth + dotRadius + scrollWidth) {
            dotArray.splice(index, 1);
            addDot();
        } else if (newX < 0 - dotRadius) {
            dotArray.splice(index, 1);
            addDot();
        } else if (newY > mainContent.offsetHeight + dotRadius) {
            dotArray.splice(index, 1);
            addDot();
        }
        else if (newY < 0 - dotRadius) {
            dotArray.splice(index, 1);
            addDot();
        } else {
            drawDot(dot);
        }
    });

    // Draw lines
    dotArray.forEach((dot1) => {
        dotArray.forEach((dot2) => {
            const pairExists = lineArray.some(pair =>
                (pair[0] === dot1 && pair[1] === dot2) || (pair[0] === dot2 && pair[1] === dot1)
            );
            if (!pairExists) {
                let distToDot2 = Math.sqrt(Math.pow((dot1.x - dot2.x), 2) + Math.pow((dot1.y - dot2.y), 2));
                if (distToDot2 < MAX_DISTANCE_BETWEEN_CONNECTIONS) {
                    lineArray.push([dot1, dot2]);
                    drawLine(dot1, dot2, distToDot2);
                }
            }
        });
    });
    // Line array gets cleared after every frame
    lineArray = [];

    // Calculate delta time
    now = performance.now()
    deltaTime = (now - lastTime) / 1000;
    lastTime = now;

    frameCount++;
    if (now - lastTime >= 1000) {
        frameCount = 0;
        lastTime = now;
    }

    requestAnimationFrame(update);
}

requestAnimationFrame(update);

function drawDot(dot) {
    ctx.beginPath();
    ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'gray';

    dot.opacity += 1 * deltaTime;
    if (dot.opacity > 1) dot.opacity = 1;

    ctx.globalAlpha = dot.opacity;

    ctx.fill();
    ctx.globalAlpha = 1;
}

function drawLine(dot1, dot2, distance) {

    let alpha = 1 - distance / MAX_DISTANCE_BETWEEN_CONNECTIONS;
    alpha = Math.min(Math.abs(alpha), 1);

    ctx.beginPath();
    ctx.globalAlpha = alpha;
    ctx.strokeStyle = 'lightgray';
    ctx.moveTo(dot1.x, dot1.y);
    ctx.lineTo(dot2.x, dot2.y);
    ctx.stroke();
    ctx.globalAlpha = 1;
}