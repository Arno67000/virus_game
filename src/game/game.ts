import { Virus } from "../sprites/virus";
import VIRUS_IMG from "../assets/images/virus.png";
import { isHTMLElement, isVirus } from "./checkers";
import { Menu } from "../view/menu";
import { User } from "./user";

export class Game {
    private breakpoint: number;
    private canva: HTMLElement;
    private delay: number;
    private hit: number;
    private menu: Menu;
    private missed: number;
    private over: boolean;
    private running: boolean;
    private time: number;
    private won: boolean;
    private user: User;

    constructor(canva: HTMLElement, menu: Menu, user: User) {
        this.time = 60;
        this.breakpoint = 50;
        this.delay = 2000;
        this.running = false;
        this.over = false;
        this.won = false;
        this.hit = 0;
        this.missed = 0;
        this.canva = canva;
        this.menu = menu;
        this.user = user;
    }

    prepare() {
        this.menu.prepare(this.user);
        this.canva.addEventListener("click", (event: Event) => {
            const targetElement = event.target;
            if (
                this.running &&
                isHTMLElement(targetElement) &&
                isVirus(targetElement)
            ) {
                targetElement.remove();
                this.user.score++;
                this.hit++;
                this.menu.updateScore(this.user.score);
            } else {
                this.running && this.missed++;
            }
        });
        this.menu.startButton.addEventListener("click", () => {
            if (!this.running) {
                this.start(!this.over);
            }
        });
    }

    private start(keepScore: boolean) {
        this.setupNewGame(keepScore);
        this.run();
    }

    private run() {
        this.over = this.isGameOver();
        this.user.accuracy = (this.hit * 100) / (this.hit + this.missed);
        if (this.over) {
            this.running = false;
            this.won = false;
            this.user.setGameOver(this.hit, this.missed);
            this.menu.setGameEnd(this.won, this.user.accuracy, this.user.name);
            this.canvaCleanUp();
        } else if (this.time === 0) {
            this.running = false;
            this.won = true;
            this.user.setGameWon(this.hit, this.missed);
            this.menu.setGameEnd(this.won, this.user.accuracy, this.user.name);
        } else {
            const lv = this.user.level;
            const invaders = lv % 2 === 0 ? lv / 2 : Math.ceil(lv / 2);
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
        if (!keepScore) {
            this.user.score = 0;
        }
        this.time = 60;
        this.hit = 0;
        this.missed = 0;
        this.running = true;
        this.over = false;
        this.won = false;
        this.menu.setGameStart(this.user.level);
    }
}
