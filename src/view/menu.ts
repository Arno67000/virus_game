import { getTopPlayers, getUserStats } from "../storage/handler";
import { User } from "../game/user";
import { ElementList, StoredUser } from "../schemas/interfaces";

export class Menu {
    private accuracyArea: HTMLElement;
    private alertArea: HTMLElement;
    private levelArea: HTMLElement;
    private modal: HTMLElement;
    private modalCloseButton: HTMLElement;
    private nameArea: HTMLElement;
    private resultArea: HTMLElement;
    private scoreArea: HTMLElement;
    private statsAccuracyArea: HTMLElement;
    private statsBestScoreArea: HTMLElement;
    private statsTotalKillsArea: HTMLElement;
    private timer: HTMLElement;
    leaderboardButton: HTMLElement;
    startButton: HTMLElement;
    constructor(elements: ElementList) {
        this.accuracyArea = elements.accuracyArea;
        this.alertArea = elements.alertArea;
        this.levelArea = elements.levelArea;
        this.resultArea = elements.resultArea;
        this.scoreArea = elements.scoreArea;
        this.startButton = elements.startButton;
        this.timer = elements.timerArea;
        this.nameArea = elements.nameArea;
        this.modal = elements.modal;
        this.modalCloseButton = elements.modalCloseButton;
        this.statsAccuracyArea = elements.statsAcc;
        this.statsBestScoreArea = elements.statsBest;
        this.statsTotalKillsArea = elements.statsKilled;
        this.leaderboardButton = elements.leaderboardButton;
        this.disableAlert();
    }

    prepare(user: User) {
        this.setPlayerName(user.name);
        this.updateLevel(user.level);
        this.updateScore(user.score);
        this.updateGlobalStats(user.name);
        this.disableModal();
        this.leaderboardButton.addEventListener("click", () => {
            if (!this.leaderboardButton.getAttribute("disabled")) {
                this.enableModal();
                this.disableLeaderboard();
                this.disableStartButton();
            }
        });
        this.modalCloseButton.addEventListener("click", () => {
            if (this.modal.getAttribute("display") !== "none") {
                this.disableModal();
                this.enableLeaderboard();
                this.startButton.removeAttribute("hidden");
            }
        });
    }
    updateScore(value: number) {
        this.scoreArea.textContent = String(value);
    }
    updateLevel(value: number) {
        this.levelArea.innerText = String(value);
    }
    refreshTimer(value: number) {
        this.timer.textContent = String(value);
    }
    setGameEnd(won: boolean, accuracy: number, username: string) {
        this.disableAlert();
        this.enableStartButton(won);
        this.enableResults(won, accuracy);
        this.updateGlobalStats(username);
        this.enableLeaderboard();
    }
    setGameStart(level: number) {
        this.updateLevel(level);
        this.disableStartButton();
        this.disableResults();
        this.enableAlert();
        this.disableLeaderboard();
    }
    setPlayerName(name: string) {
        this.nameArea.innerText = name;
    }
    updateGlobalStats(name: string) {
        const user = getUserStats(name);
        this.statsAccuracyArea.innerHTML = String(
            user.overall_accuracy.toFixed(2)
        );
        this.statsBestScoreArea.innerHTML = String(user.best_score);
        this.statsTotalKillsArea.innerHTML = String(user.hit_count);
    }

    private enableModal() {
        const bestPlayers = getTopPlayers();
        bestPlayers.forEach((player: StoredUser, i) => {
            const name = document.getElementById(`${i}_name`);
            const score = document.getElementById(`${i}_score`);
            const acc = document.getElementById(`${i}_acc`);
            name && (name.innerHTML = player.name);
            score && (score.innerHTML = String(player.best_score));
            acc &&
                (acc.innerHTML =
                    String(player.overall_accuracy.toFixed(2)) + "%");
        });
        this.modal.style.display = "flex";
    }
    private disableModal() {
        this.modal.style.display = "none";
    }
    private disableLeaderboard() {
        this.leaderboardButton.setAttribute("disabled", "true");
    }
    private enableLeaderboard() {
        this.leaderboardButton.removeAttribute("disabled");
    }
    private enableStartButton(won: boolean) {
        this.startButton.innerHTML = won ? "Start next level" : "Start level";
        this.startButton.removeAttribute("hidden");
    }
    private disableStartButton() {
        this.startButton.setAttribute("hidden", "true");
    }
    private enableAlert() {
        this.alertArea.removeAttribute("hidden");
    }
    private disableAlert() {
        this.alertArea.setAttribute("hidden", "true");
    }
    private enableResults(won: boolean, accuracy: number) {
        this.accuracyArea.innerText = `Accuracy: ${String(accuracy)} %`;
        this.resultArea.innerText = won ? "You WIN" : "You LOOSE";

        this.resultArea.style.color = won ? "aqua" : "red";
        this.accuracyArea.style.color =
            accuracy > 75 ? "aquamarine" : accuracy > 50 ? "orange" : "red";
        this.accuracyArea.style.opacity = "1";
        this.resultArea.style.opacity = "1";
    }
    private disableResults() {
        this.accuracyArea.style.opacity = "0";
        this.resultArea.style.opacity = "0";
    }
}
