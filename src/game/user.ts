export class User {
    name: string;
    level: number;
    score: number;
    accuracy: number;

    constructor(name: string) {
        this.name = name;
        this.level = 1;
        this.score = 0;
        this.accuracy = 0;
    }
}
