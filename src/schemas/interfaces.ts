export interface ElementList {
    accuracyArea: HTMLElement;
    alertArea: HTMLElement;
    levelArea: HTMLElement;
    resultArea: HTMLElement;
    scoreArea: HTMLElement;
    startButton: HTMLElement;
    timerArea: HTMLElement;
    canva: HTMLElement;
    menuArea: HTMLElement;
    loginForm: HTMLElement;
    submit: HTMLElement;
    input: HTMLInputElement;
    nameArea: HTMLElement;
    checkbox: HTMLInputElement;
    statsAcc: HTMLElement;
    statsBest: HTMLElement;
    statsKilled: HTMLElement;
    leaderboardButton: HTMLElement;
    modal: HTMLElement;
    modalCloseButton: HTMLElement;
}

export interface StoredUser {
    name: string;
    current_level: number;
    best_score: number;
    current_score: number;
    overall_accuracy: number;
    hit_count: number;
    miss_count: number;
}
