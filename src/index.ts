import { Game } from "./game";
import { Menu } from "./view/menu";

(() => {
    const accuracyArea = document.getElementById("accuracy");
    const alertArea = document.getElementById("alert");
    const levelArea = document.getElementById("level");
    const resultArea = document.getElementById("result");
    const scoreArea = document.getElementById("score");
    const startButton = document.getElementById("start");
    const timerArea = document.getElementById("time");
    const canva = document.getElementById("canva");
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
    const menu = new Menu(
        accuracyArea,
        alertArea,
        levelArea,
        resultArea,
        scoreArea,
        startButton,
        timerArea
    );
    new Game(1, canva, menu).prepare();
})();
