import { getUserStats, saveUserStats } from "../storage/handler";

export class User {
    name: string;
    level: number;
    score: number;
    accuracy: number;

    constructor(input: { name: string; restart: boolean }) {
        const storedUser = getUserStats(input.name);
        this.name = storedUser.name;
        this.level = input.restart ? 1 : storedUser.current_level;
        this.score = input.restart ? 0 : storedUser.current_score;
        this.accuracy = input.restart ? 0 : storedUser.overall_accuracy;
    }

    setGameOver(hits: number, missed: number) {
        this.level = 1;
        this.score = 0;
        saveUserStats(this, hits, missed);
    }

    setGameWon(hits: number, missed: number) {
        this.level++;
        saveUserStats(this, hits, missed);
    }
}
