import { isGamePlayable } from "./game/checkers";
import { Game } from "./game/game";
import { User } from "./game/user";
import { Board } from "./view/board";
import { Menu } from "./view/menu";
import assert from "assert";
import { storageInit } from "./storage/handler";

(async () => {
    const htmlElements = {
        accuracyArea: document.getElementById("accuracy"),
        alertArea: document.getElementById("alert"),
        levelArea: document.getElementById("level"),
        resultArea: document.getElementById("result"),
        scoreArea: document.getElementById("score"),
        startButton: document.getElementById("start"),
        timerArea: document.getElementById("time"),
        canva: document.getElementById("canva"),
        menuArea: document.getElementById("menu"),
        loginForm: document.getElementById("login"),
        submit: document.getElementById("submit"),
        input: document.getElementById("name"),
        nameArea: document.getElementById("p_name"),
        checkbox: document.getElementById("restart"),
        statsAcc: document.getElementById("acc"),
        statsBest: document.getElementById("best"),
        statsKilled: document.getElementById("killed"),
        leaderboardButton: document.getElementById("leaderboard"),
        modal: document.getElementById("modal"),
        modalCloseButton: document.getElementById("close_modal"),
    };
    try {
        assert.ok(isGamePlayable(htmlElements));
        storageInit();

        const board = new Board(htmlElements);
        board.prepare();

        const user = new User(await board.getUsername());
        const menu = new Menu(htmlElements);

        new Game(htmlElements.canva, menu, user).prepare();
    } catch (error) {
        alert(error);
    }
})();
