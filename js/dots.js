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

    DOT_COUNT = Math.floor(Math.max(canvas.width / 20, canvas.height / 20));

    // Change dot count when canvas size changes
    if (DOT_COUNT > dotArray.length) {
        for (let i = dotArray.length; i < DOT_COUNT; i++) {
            addDot();
        }
    } else if (DOT_COUNT < dotArray.length) {
        dotArray.splice(DOT_COUNT, dotArray.length - DOT_COUNT);
    }
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
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Stuff that changes only between frames
    const scrollWidth = window.getScrollbarWidth();
    const canvasWidth = mainContent.offsetWidth;
    const canvasHeight = mainContent.offsetHeight;


    dotArray.forEach((dot, index) => {
        // Stuff that changes between dots
        const dotX = dot.x;
        const dotY = dot.y;
        // If screen size changes, the dot size has to, too.
        const dotRadius = Math.min(window.screen.width / 300, window.screen.height / 300);

        let dotSpeed = dot.speed;
        let dotDirectionDeg = dot.directionDeg;

        // Move dots (dotDirectionDeg * (Math.PI / 180) converts to radians)
        const newX = dotX + Math.cos(dotDirectionDeg * (Math.PI / 180)) * dotSpeed;
        const newY = dotY + Math.sin(dotDirectionDeg * (Math.PI / 180)) * dotSpeed;


        // Offscreen? Add new
        if (newX > canvasWidth + MAX_DISTANCE_BETWEEN_CONNECTIONS + scrollWidth) {
            dotArray.splice(index, 1);
            addDot();
        } else if (newX < 0 - MAX_DISTANCE_BETWEEN_CONNECTIONS) {
            dotArray.splice(index, 1);
            addDot();
        } else if (newY > canvasHeight + MAX_DISTANCE_BETWEEN_CONNECTIONS) {
            dotArray.splice(index, 1);
            addDot();
        } else if (newY < 0 - MAX_DISTANCE_BETWEEN_CONNECTIONS) {
            dotArray.splice(index, 1);
            addDot();
        } else {
            drawDot(dot);
        }

        // Interact with dots
        if (!window.isTouchDevice()) {

            // Purposefully lacking Math.sqrt and using X * X over Math.Pow
            let distToCursorSquared = (cursorX - dotX)*(cursorX - dotX) + (cursorY - dotY)*(cursorY - dotY);
            if (distToCursorSquared < MIN_DIST_TO_MOUSE * MIN_DIST_TO_MOUSE) {
                let dy = cursorY - newY;
                let dx = cursorX - newX;
                dotDirectionDeg = Math.atan2(-dy, -dx) * (180 / Math.PI);
                dotSpeed = Math.min(Math.abs(Math.sqrt(distToCursorSquared) - 50) + 1, MAX_SPEED * 2);
            }
        }

        // Draw lines
        dotArray.forEach((dot2) => {
            const dot2X = dot2.x;
            const dot2Y = dot2.y;
            if (((Math.abs(newX - dot2X)) < MAX_DISTANCE_BETWEEN_CONNECTIONS || (Math.abs(newY - dot2Y)) < MAX_DISTANCE_BETWEEN_CONNECTIONS)) {
                const pairExists = lineArray.some(pair =>
                    (pair[0] === dot && pair[1] === dot2) || (pair[0] === dot2 && pair[1] === dot)
                );
                if (!pairExists) {
                    // Purposefully lacking Math.sqrt and using X * X over Math.Pow
                    let distToDot2Squared = (newX - dot2X)*(newX - dot2X) + (newY - dot2Y)*(newY - dot2Y);
                    if (distToDot2Squared < MAX_DISTANCE_BETWEEN_CONNECTIONS * MAX_DISTANCE_BETWEEN_CONNECTIONS) {
                        lineArray.push([dot, dot2]);
                        drawLine(dot, dot2, distToDot2Squared);
                    }
                }
            }
        });

        dot.x = newX;
        dot.y = newY;
        dot.radius = dotRadius;
        dot.speed = dotSpeed;
        dot.directionDeg = dotDirectionDeg;
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

    if (document.querySelector('#dotCount')) {
        document.querySelector('#dotCount').textContent = `${dotArray.length}`
    }

    requestAnimationFrame(update);
}

requestAnimationFrame(update);

function drawDot(dot) {
    let dotOp = dot.opacity
    ctx.beginPath();
    ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'gray';

    dotOp += 1 * deltaTime;
    if (dotOp > 1) dotOp = 1;

    ctx.globalAlpha = dotOp;

    ctx.fill();
    ctx.globalAlpha = 1;

    dot.opacity = dotOp;
}

function drawLine(dot1, dot2, distanceSquared) {

    let alpha = 1 - distanceSquared / (MAX_DISTANCE_BETWEEN_CONNECTIONS * MAX_DISTANCE_BETWEEN_CONNECTIONS);
    alpha = Math.min(Math.abs(alpha), 1);

    ctx.beginPath();
    ctx.globalAlpha = Math.min(alpha, dot1.opacity, dot2.opacity);
    ctx.strokeStyle = 'lightgray';
    ctx.moveTo(dot1.x, dot1.y);
    ctx.lineTo(dot2.x, dot2.y);
    ctx.stroke();
    ctx.globalAlpha = 1;
}