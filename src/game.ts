import { Virus } from "./sprites/virus";
import VIRUS_IMG from "./assets/images/virus.png";
import { isHTMLElement, isVirus } from "./checkers";
import { Menu } from "./view/menu";

export class Game {
    private breakpoint: number;
    private canva: HTMLElement;
    private delay: number;
    private hit: number;
    private level: number;
    private menu: Menu;
    private missed: number;
    private over: boolean;
    private running = false;
    private score: number;
    private time: number;
    private won: boolean;

    constructor(level: number, canva: HTMLElement, menu: Menu) {
        this.time = 60;
        this.breakpoint = 50;
        this.delay = 2000;
        this.score = 0;
        this.running = false;
        this.over = false;
        this.won = false;
        this.hit = 0;
        this.missed = 0;
        this.level = level;
        this.canva = canva;
        this.menu = menu;
    }

    prepare() {
        this.canva.addEventListener("click", (event: Event) => {
            const targetElement = event.target;
            if (
                this.running &&
                isHTMLElement(targetElement) &&
                isVirus(targetElement)
            ) {
                targetElement.remove();
                this.score++;
                this.hit++;
                this.menu.updateScore(this.score);
            } else {
                this.running && this.missed++;
            }
        });
        this.menu.startButton.addEventListener("click", () => {
            if (!this.running) {
                this.won && this.level++;
                this.over && (this.level = 1);
                this.start(this.won);
            }
        });
    }

    private start(keepScore: boolean) {
        if (!this.running) {
            this.setupNewGame(keepScore);
        } else {
            alert("game is already running");
        }
        this.run();
    }

    private run() {
        this.over = this.isGameOver();
        const accuracy = (this.hit * 100) / (this.hit + this.missed);
        if (this.over) {
            this.running = false;
            this.won = false;
            this.menu.setGameEnd(this.won, accuracy);
            this.canvaCleanUp();
        } else if (this.time === 0) {
            this.running = false;
            this.won = true;
            this.menu.setGameEnd(this.won, accuracy);
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
                this.menu.refreshTimer(this.time);
                this.run();
            }, this.delay);
        }
    }

    private addVirus() {
        this.canva.appendChild(new Virus(VIRUS_IMG, this.canva).get());
    }

    private isGameOver(): boolean {
        return (
            this.canva.getElementsByClassName("virus").length >= this.breakpoint
        );
    }

    private canvaCleanUp() {
        const viruses = Object.values(
            this.canva.getElementsByClassName("virus")
        );
        viruses.forEach((element: Element) => {
            setTimeout(() => {
                element.remove();
            }, 550);
        });
    }

    private setupNewGame(keepScore: boolean) {
        this.time = 60;
        this.hit = 0;
        this.missed = 0;
        this.running = true;
        this.over = false;
        this.won = false;
        this.menu.setGameStart(this.level);
        if (!keepScore) {
            this.score = 0;
        }
    }
}
