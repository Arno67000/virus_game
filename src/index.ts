import { Game } from "./game/game";
import { User } from "./game/user";
import { Board } from "./view/board";
import { Menu } from "./view/menu";

(async () => {
    const accuracyArea = document.getElementById("accuracy");
    const alertArea = document.getElementById("alert");
    const levelArea = document.getElementById("level");
    const resultArea = document.getElementById("result");
    const scoreArea = document.getElementById("score");
    const startButton = document.getElementById("start");
    const timerArea = document.getElementById("time");
    const canva = document.getElementById("canva");
    const menuArea = document.getElementById("menu");
    const loginForm = document.getElementById("login");
    const submit = document.getElementById("submit");
    const input = document.getElementById("name");
    if (
        !canva ||
        !timerArea ||
        !scoreArea ||
        !startButton ||
        !alertArea ||
        !levelArea ||
        !resultArea ||
        !accuracyArea ||
        !menuArea ||
        !loginForm ||
        !submit ||
        !input
    ) {
        alert("Missing element in page, please reload and try again.");
        return;
    }

    const board = new Board(
        canva,
        menuArea,
        loginForm,
        input as HTMLInputElement,
        submit
    );
    board.prepare();
    const user = new User(await board.getUsername());
    const menu = new Menu(
        accuracyArea,
        alertArea,
        levelArea,
        resultArea,
        scoreArea,
        startButton,
        timerArea
    );
    new Game(canva, menu, user).prepare();
})();
