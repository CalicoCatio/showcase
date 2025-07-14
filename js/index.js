// Hello animation
async function helloAnim() {
    const masterArray = [
        ["Hi,", 1.25],
        ["I'm Ariel.", 1.25],
        ["", 0.25],
        ["Online,", 1.25],
        ["I go by the name CalicoCatio.", 1.5],
        ["", 0.25],
        ["I am a video game player", 1.5],
        ["and video game maker.", 1.5],
        ["", 0.25],
        ["This website is dedicated those games,", 2],
        ["", 0.25],
        ["and other things I have made.", 2],
        ["", 2]
    ];
    while (true) {
        for ([text, delay] of masterArray) {
            document.body.querySelector("#helloAnim").innerHTML = text;
            // In
            document.body.querySelector("#helloAnim").classList.remove("fade-out");
            document.body.querySelector("#helloAnim").classList.add("fade-in");
            if (delay > 1) {
                await window.sleep(500);
            } else {
                await window.sleep(delay/2 * 1000);
            }
            // Hold
            if (delay > 1) {
                await window.sleep(delay * 1000);
            }
            // Out
            document.body.querySelector("#helloAnim").classList.remove("fade-in");
            document.body.querySelector("#helloAnim").classList.add("fade-out");
            if (delay > 1) {
                await window.sleep(500);
            } else {
                await window.sleep(delay / 2 * 1000);
            }
        }
    }
}