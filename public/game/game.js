export class Game {
    constructor(level) {
        this.running = false;
        this.time = 59 + level;
        this.breakpoint = 51 - level;
        this.delay = 6000 - level * level;
        this.score = 0;
        this.running = false;
    }
    isOn() {
        return this.running;
    }
    start(board) {
        console.log("starting");
        if (!this.isOn()) {
            this.running = true;
        }
        this.addVirus(board);
    }
    addVirus(target) {
        const targetHeight = Number(target.getAttribute("height"));
        const testHeight = target.clientHeight;
        const targetWidth = Number(target.getAttribute("width"));
        const testWidth = target.clientWidth;
        console.log(targetHeight, testHeight, targetWidth, testWidth);
        const virus = new Image();
        virus.src = "./assets/images/sprites/virus.png";
        virus.classList.add("virus");
        virus.style.top = `${randomize(750)} px`;
        virus.style.left = `${randomize(1450)} px`;
        const translateY = randomize(750) * maybeMinus();
        const translateX = randomize(1450) * maybeMinus();
        virus.style.setProperty("--trY", `${translateY}%`);
        virus.style.setProperty("--trX", `${translateX}%`);
        console.log(virus);
        target.appendChild(virus);
    }
}
const randomize = (number) => Math.random() * number;
const maybeMinus = () => (randomize(1) < 0.5 ? -1 : 1);
