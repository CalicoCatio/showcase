// Initialize
mainContent = document.body.querySelector('.main-content');
canvas = document.createElement('canvas');
canvas.style.position = 'absolute';
canvas.style.top = '0';
canvas.style.zIndex = '-10';
canvas.id = 'dotsCanvas';
canvas.style.padding = '0';
canvas = mainContent.appendChild(canvas);
ctx = canvas.getContext("2d");

dotArray = [];
cursorX = 0;
cursorY = 0;
MIN_DIST_TO_MOUSE = 75;
DOT_COUNT = Math.max(canvas.width / 25, canvas.height / 25);
MAX_SPEED = 2;
MIN_SPEED = 1;
MAX_DISTANCE_BETWEEN_CONNECTIONS = 100;

lastTime = performance.now();
frameCount = 0;
deltaTime = 0;

// Resize canvas
function canvasResize() {
    console.log('hi');
    const dpr = window.devicePixelRatio || 1;
    canvas.width = mainContent.offsetWidth * dpr;
    canvas.height = mainContent.offsetHeight * dpr;

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);

    DOT_COUNT = Math.max(canvas.width/25, canvas.height/25);
}

canvasResize();
window.addEventListener('resize', canvasResize);
// Since accordions can change canvas size and don't trigger the above listener, another trigger is needed
document.querySelectorAll('.accordion-collapse').forEach(item => {
    item.addEventListener('shown.bs.collapse', canvasResize);
    item.addEventListener('hidden.bs.collapse', canvasResize);
});

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
    dot.radius = Math.min(mainContent.offsetWidth / 200, mainContent.offsetHeight / 200);
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
        dotArray.splice(dotArray.length, DOT_COUNT - dotArray.length);
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Check if next to cursor and move in oposite dir
    dotArray.forEach((dot) => {
        const dotX = dot.x;
        const dotY = dot.y;
        let distToCursor = Math.sqrt(Math.pow((cursorX - parseFloat(dotX)), 2) + Math.pow((cursorY - parseFloat(dotY)), 2));
        if (distToCursor < MIN_DIST_TO_MOUSE) {
            let dy = cursorY - dotY;
            let dx = cursorX - dotX;
            dot.directionDeg = Math.atan2(-dy, -dx) * (180 / Math.PI);
            dot.speed = Math.min(Math.abs(distToCursor - 50) + 1, MAX_SPEED*2);
        }
    });


    // Move dot
    dotArray.forEach((dot, index) => {
        const dotX = dot.x;
        const dotY = dot.y;
        const directionRad = dot.directionDeg * (Math.PI / 180);
        let dotspeed = dot.speed;

        const newX = dotX + Math.cos(directionRad) * dotspeed;
        const newY = dotY + Math.sin(directionRad) * dotspeed;

        dot.x = newX;
        dot.y = newY;

        // If screen size changes, the dot size has to, too.
        dot.radius = Math.min(mainContent.offsetWidth / 200, mainContent.offsetHeight / 200);

        // Offscreen? Add new
        if (parseFloat(newX) > mainContent.offsetWidth) {
            dotArray.splice(index, 1);
            addDot();
        } else if (parseFloat(newX) < 0) {
            dotArray.splice(index, 1);
            addDot();
        } else if (parseFloat(newY) > mainContent.offsetHeight) {
            dotArray.splice(index, 1);
            addDot();
        }
        else if (parseFloat(newY) < 0) {
            dotArray.splice(index, 1);
            addDot();
        } else {
            drawDot(dot);
        }
    });

    // Draw lines
    dotArray.forEach((dot) => {
        
    });

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