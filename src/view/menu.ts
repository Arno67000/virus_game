export class Menu {
    private accuracyArea: HTMLElement;
    private alertArea: HTMLElement;
    private levelArea: HTMLElement;
    private resultArea: HTMLElement;
    private scoreArea: HTMLElement;
    private timer: HTMLElement;
    startButton: HTMLElement;
    constructor(
        accuracyArea: HTMLElement,
        alertArea: HTMLElement,
        levelArea: HTMLElement,
        resultArea: HTMLElement,
        scoreArea: HTMLElement,
        startButton: HTMLElement,
        timer: HTMLElement
    ) {
        this.accuracyArea = accuracyArea;
        this.alertArea = alertArea;
        this.levelArea = levelArea;
        this.resultArea = resultArea;
        this.scoreArea = scoreArea;
        this.startButton = startButton;
        this.timer = timer;
        this.disableAlert();
    }
    updateScore(value: number) {
        this.scoreArea.textContent = String(value);
    }
    refreshTimer(value: number) {
        this.timer.textContent = String(value);
    }
    setGameEnd(won: boolean, accuracy: number) {
        this.disableAlert();
        this.enableStartButton(won);
        this.enableResults(won, accuracy);
    }
    setGameStart(level: number) {
        this.updateLevel(level);
        this.disableStartButton();
        this.disableResults();
        this.enableAlert();
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
    private updateLevel(value: number) {
        this.levelArea.innerText = String(value);
    }
    private enableResults(won: boolean, accuracy: number) {
        this.accuracyArea.innerText = `Accuracy: ${String(accuracy)} %`;
        this.resultArea.innerText = won ? "You WIN" : "You LOOSE";

        this.resultArea.style.color = won ? "aqua" : "red";
        this.accuracyArea.style.color =
            accuracy > 75 ? "aquamarine" : accuracy > 50 ? "orange" : "red";
        this.accuracyArea.removeAttribute("hidden");
        this.resultArea.removeAttribute("hidden");
    }
    private disableResults() {
        this.resultArea.setAttribute("hidden", "true");
        this.accuracyArea.setAttribute("hidden", "true");
    }
}
