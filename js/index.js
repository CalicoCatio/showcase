// Helper function
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Hello animation
async function helloAnim() {
    const masterArray = [
        ["Hi,", 1.25],
        ["I'm Ariel.", 1.25],
        ["", 0.5],
        ["Online,", 1.25],
        ["I go by the name CalicoCatio.", 1.5],
        ["", 0.5],
        ["I am a video game maker", 1.5],
        ["and video game player.", 1.5],
        ["", 2]
    ];
    while (true) {
        for ([text, delay] of masterArray) {
            document.body.querySelector("#helloAnim").innerHTML = text;
            // In
            document.body.querySelector("#helloAnim").classList.remove("fade-out");
            document.body.querySelector("#helloAnim").classList.add("fade-in");
            if (delay > 1) {
                await sleep(500);
            } else {
                await sleep(delay/2 * 1000);
            }
            // Hold
            if (delay > 1) {
                await sleep(delay * 1000);
            }
            // Out
            document.body.querySelector("#helloAnim").classList.remove("fade-in");
            document.body.querySelector("#helloAnim").classList.add("fade-out");
            if (delay > 1) {
                await sleep(500);
            } else {
                await sleep(delay / 2 * 1000);
            }
        }
    }
}