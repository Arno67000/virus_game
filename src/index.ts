import { Virus } from "./sprites/virus";

import VIRUS_IMG from "./assets/images/virus.png";
class Game {
    private accuracyArea: HTMLElement;
    private alertArea: HTMLElement;
    private breakpoint: number;
    private canva: HTMLElement;
    private clicked: number;
    private delay: number;
    private level: number;
    private levelArea: HTMLElement;
    private missed: number;
    private over: boolean;
    private resultArea: HTMLElement;
    private running = false;
    private score: number;
    private scoreArea: HTMLElement;
    private startButton: HTMLElement;
    private time: number;
    private timer: HTMLElement;
    private won: boolean;

    constructor(
        level: number,
        canva: HTMLElement,
        timer: HTMLElement,
        startButton: HTMLElement,
        scoreArea: HTMLElement,
        alertArea: HTMLElement,
        levelArea: HTMLElement,
        resultArea: HTMLElement,
        accuracyArea: HTMLElement
    ) {
        this.level = level;
        this.time = 60;
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
        this.clicked = 0;
        this.missed = 0;
        this.levelArea = levelArea;
        this.resultArea = resultArea;
        this.accuracyArea = accuracyArea;
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
                this.clicked++;
                this.scoreArea.textContent = String(this.score);
            } else {
                this.running && this.missed++;
            }
        });
        this.startButton.addEventListener("click", () => {
            if (!this.running && this.won) {
                this.level++;
            } else if (!this.running && this.over) {
                this.level = 1;
            }
            !this.running && this.start(this.won);
        });
    }

    start(keepScore: boolean) {
        if (!this.running) {
            this.setupNewGame(keepScore);
        } else {
            alert("game is already running");
        }
        this.run();
    }

    run() {
        this.over = this.gameOver();
        if (this.over) {
            this.running = false;
            this.over = true;
            this.disableAlert();
            this.enableStartButton(this.won);
            this.enableResults(this.won);
            this.screenCleanUp();
        } else if (this.time === 0) {
            this.running = false;
            this.won = true;
            this.disableAlert();
            this.enableStartButton(this.won);
            this.enableResults(this.won);
        } else {
            const invaders =
                this.level % 2 === 0
                    ? this.level / 2
                    : Math.ceil(this.level / 2);
            for (let i = 0; i < invaders; i++) {
                this.addVirus();
            }
            setTimeout(() => {
                this.time--;
                this.timer.textContent = String(this.time);
                this.run();
            }, this.delay);
        }
    }

    addVirus() {
        const virus = new Virus(VIRUS_IMG, this.canva);
        this.canva.appendChild(virus.image);
    }

    gameOver(): boolean {
        return (
            this.canva.getElementsByClassName("virus").length >= this.breakpoint
        );
    }

    screenCleanUp() {
        const viruses = Object.values(
            this.canva.getElementsByClassName("virus")
        );
        viruses.forEach((element: Element) => {
            setTimeout(() => {
                element.remove();
            }, 550);
        });
    }
    setupNewGame(keepScore: boolean) {
        this.time = 60;
        this.breakpoint = 51 - this.level;
        this.delay = 3000 - this.level * this.level;
        this.clicked = 0;
        this.missed = 0;
        this.running = true;
        this.over = false;
        this.won = false;
        this.levelArea.innerText = String(this.level);
        this.disableStartButton();
        this.disableResults();
        this.enableAlert();
        if (!keepScore) {
            this.score = 0;
        }
    }

    enableAlert() {
        this.alertArea.removeAttribute("hidden");
    }
    disableAlert() {
        this.alertArea.setAttribute("hidden", "true");
    }

    enableStartButton(won: boolean) {
        this.startButton.innerHTML = won ? "Start next level" : "Start level";
        this.startButton.removeAttribute("hidden");
    }
    disableStartButton() {
        this.startButton.setAttribute("hidden", "true");
    }

    enableResults(won: boolean) {
        const rating = (this.clicked * 100) / (this.clicked + this.missed);
        this.accuracyArea.innerText = `Accuracy: ${String(rating)} %`;
        this.resultArea.innerText = won ? "You WIN" : "You LOOSE";

        this.resultArea.style.color = won ? "aqua" : "red";
        this.accuracyArea.style.color =
            rating > 75 ? "aquamarine" : rating > 50 ? "orange" : "red";
        this.accuracyArea.removeAttribute("hidden");
        this.resultArea.removeAttribute("hidden");
    }
    disableResults() {
        this.resultArea.setAttribute("hidden", "true");
        this.accuracyArea.setAttribute("hidden", "true");
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
    const scoreArea = document.getElementById("score");
    const timerArea = document.getElementById("time");
    const alertArea = document.getElementById("alert");
    const levelArea = document.getElementById("level");
    const resultArea = document.getElementById("result");
    const accuracyArea = document.getElementById("accuracy");
    if (
        !canva ||
        !timerArea ||
        !scoreArea ||
        !startButton ||
        !alertArea ||
        !levelArea ||
        !resultArea ||
        !accuracyArea
    ) {
        alert("Missing element in page, please reload and try again.");
        return;
    }
    new Game(
        1,
        canva,
        timerArea,
        startButton,
        scoreArea,
        alertArea,
        levelArea,
        resultArea,
        accuracyArea
    ).prepare();
})();
