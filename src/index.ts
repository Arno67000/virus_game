class Game {
    time: number;
    breakpoint: number;
    delay: number;
    score: number;
    alertArea: HTMLElement;
    canva: HTMLElement;
    timer: HTMLElement;
    startButton: HTMLElement;
    scoreArea: HTMLElement;
    level: number;
    private over: boolean;
    private won: boolean;
    private running = false;
    constructor(
        level: number,
        canva: HTMLElement,
        timer: HTMLElement,
        startButton: HTMLElement,
        scoreArea: HTMLElement,
        alertArea: HTMLElement
    ) {
        this.level = level;
        this.time = 59 + level;
        this.breakpoint = 51 - level;
        this.delay = 3000 - level * level;
        this.score = 0;
        this.running = false;
        this.over = false;
        this.won = false;
        this.alertArea = alertArea;
        this.canva = canva;
        this.timer = timer;
        this.startButton = startButton;
        this.scoreArea = scoreArea;
    }

    prepare() {
        this.disableAlert();
        this.canva.addEventListener("click", (event: Event) => {
            const targetElement = event.target;
            if (
                this.running &&
                isHTMLElement(targetElement) &&
                targetElement.classList.contains("virus")
            ) {
                targetElement.remove();
                this.score++;
                this.scoreArea.textContent = String(this.score);
            }
        });
        this.startButton.addEventListener("click", () => {
            if (!this.running && this.won) this.level++;
            !this.running && this.start();
        });
    }

    start() {
        if (!this.running) {
            this.running = true;
            this.over = false;
            this.disableStartButton();
        } else {
            alert("game is already running");
        }
        this.enableAlert();
        this.run();
    }

    run() {
        this.over = this.gameOver();
        if (this.time === 0 && !this.over) {
            // handle score && message et button next wave
            this.running = false;
            this.won = true;
            this.enableStartButton();
            alert("you win");
        } else if (!this.over) {
            const invaders =
                this.level % 2 ? this.level / 2 : Math.round(this.level % 2);
            for (let i = 0; i < invaders; i++) {
                this.addVirus();
            }
            setTimeout(() => {
                this.time--;
                this.timer.textContent = String(this.time);
                this.run();
            }, this.delay);
        } else {
            // handle score && message et button start
            this.running = false;
            this.over = true;
            alert("game over");
        }
    }

    addVirus() {
        const targetHeight = this.canva.clientHeight;
        const targetWidth = this.canva.clientWidth;

        const virus = new Image();
        virus.src = "./assets/images/sprites/virus.png";
        virus.classList.add("virus");

        const virusSize = Math.random() * 45 + 30;
        virus.style.setProperty("--x", `${virusSize}px`);
        virus.style.setProperty("--y", `${virusSize}px`);

        const offsetX = randomize(targetHeight) - virusSize / 2;
        const offsetY = randomize(targetWidth) - virusSize / 2;
        virus.style.setProperty(
            "--top",
            `${offsetX > 0 ? offsetX : virusSize / 2}px`
        );
        virus.style.setProperty(
            "--left",
            `${offsetY > 0 ? offsetY : virusSize / 2}px`
        );
        virus.style.setProperty(
            "--trX",
            `${defineTranslate(targetWidth, offsetY, virusSize)}px`
        );
        virus.style.setProperty(
            "--trY",
            `${defineTranslate(targetHeight, offsetX, virusSize)}px`
        );
        this.canva.appendChild(virus);
    }

    gameOver(): boolean {
        return (
            this.canva.getElementsByClassName("virus").length >= this.breakpoint
        );
    }

    enableAlert() {
        this.alertArea.removeAttribute("hidden");
    }
    disableAlert() {
        this.alertArea.setAttribute("hidden", "true");
    }

    enableStartButton() {
        this.startButton.removeAttribute("disabled");
    }
    disableStartButton() {
        this.startButton.setAttribute("disabled", "true");
    }
}

// Randomizers
const randomize = (number: number): number => Math.random() * number;
const maybeMinus = (): number => (randomize(1) < 0.5 ? -1 : 1);
const defineTranslate = (size: number, offset: number, virusSize: number) => {
    const translate = randomize(size) * maybeMinus();
    if (
        translate + offset + virusSize < 0 ||
        translate + offset + virusSize > size
    ) {
        return -offset + virusSize;
    } else {
        return translate;
    }
};

// checkers
function isHTMLElement(el: unknown): el is HTMLElement {
    return el && typeof el === "object" && Reflect.get(el, "classList");
}

// init game
(() => {
    const startButton = document.getElementById("start");
    const canva = document.getElementById("canva");
    const score = document.getElementById("score");
    const time = document.getElementById("time");
    const alertArea = document.getElementById("alert");
    if (!canva || !time || !score || !startButton || !alertArea) {
        alert("Missing element in page, please reload and try again.");
        return;
    }
    new Game(1, canva, time, startButton, score, alertArea).prepare();
})();
