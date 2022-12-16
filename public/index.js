"use strict";
class Game {
    constructor(level) {
        this.running = false;
        this.time = 59 + level;
        this.breakpoint = 51 - level;
        this.delay = 6000 - level * level;
        this.score = 0;
        this.running = false;
        this.over = false;
    }
    isOn() {
        return this.running;
    }
    gameOver(board) {
        console.log(board.getElementsByClassName("virus").length);
        return board.getElementsByClassName("virus").length >= this.breakpoint;
    }
    start(board) {
        if (!this.isOn()) {
            this.running = true;
            this.over = false;
        }
        if (!this.over) {
            this.run(board);
        }
    }
    run(board) {
        this.over = this.gameOver(board);
        if (!this.over) {
            this.addVirus(board);
            setTimeout(() => {
                this.run(board);
            }, this.delay);
        }
    }
    addVirus(target) {
        const targetHeight = target.clientHeight;
        const targetWidth = target.clientWidth;
        const virus = new Image();
        virus.src = "./assets/images/sprites/virus.png";
        virus.classList.add("virus");
        const virusSize = Math.random() * 45 + 30;
        virus.style.setProperty("--x", `${virusSize}px`);
        virus.style.setProperty("--y", `${virusSize}px`);
        const offsetX = randomize(targetHeight) - virusSize / 2;
        const offsetY = randomize(targetWidth) - virusSize / 2;
        virus.style.setProperty("--top", `${offsetX > 0 ? offsetX : virusSize / 2}px`);
        virus.style.setProperty("--left", `${offsetY > 0 ? offsetY : virusSize / 2}px`);
        virus.style.setProperty("--trX", `${defineTranslate(targetWidth, offsetY, virusSize)}px`);
        virus.style.setProperty("--trY", `${defineTranslate(targetHeight, offsetX, virusSize)}px`);
        target.appendChild(virus);
    }
}
const randomize = (number) => Math.random() * number;
const maybeMinus = () => (randomize(1) < 0.5 ? -1 : 1);
const defineTranslate = (size, offset, virusSize) => {
    const translate = randomize(size) * maybeMinus();
    if (translate + offset + virusSize < 0 ||
        translate + offset + virusSize > size) {
        return -offset + virusSize;
    }
    else {
        return translate;
    }
};
let game = null;
let startButton;
let score;
let canva;
let time;
const gameLevel = 1;
(() => {
    startButton = document.getElementById("start");
    canva = document.getElementById("canva");
    score = document.getElementById("score");
    time = document.getElementById("time");
    if (!canva || !time || !score || !startButton) {
        alert("Missing element in page, please reload and try again.");
        return;
    }
    canva.addEventListener("click", (event) => {
        console.log("targeted => ", event.target);
    });
    startButton.addEventListener("click", (event) => {
        console.log(event);
        game = new Game(gameLevel);
        canva && game.start(canva);
    });
})();
