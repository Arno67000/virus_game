import { User } from "../game/user";
import { StoredUser } from "../schemas/interfaces";

const playerStorage = "virus_players";
const storageError =
    "LocalStorage is missing or compromised.\r\nPlease reload and try again or drop your localStorage.";

export function storageInit() {
    if (!localStorage.getItem(playerStorage)) {
        localStorage.setItem(playerStorage, JSON.stringify([]));
    }
}

function getStore(): StoredUser[] {
    const storage = localStorage.getItem(playerStorage);
    if (!storage) {
        alert(storageError);
        return [];
    }
    return JSON.parse(storage);
}

function setStore(arr: StoredUser[]) {
    localStorage.setItem(playerStorage, JSON.stringify(arr));
}

export function getUserStats(name: string): StoredUser {
    const playersArray: StoredUser[] = getStore();
    let player: StoredUser | undefined = playersArray.find(
        (player) => player.name === name
    );
    if (player) {
        return player;
    }
    player = {
        name,
        current_level: 1,
        current_score: 0,
        best_score: 0,
        overall_accuracy: 0,
        hit_count: 0,
        miss_count: 0,
    };
    playersArray.push(player);
    setStore(playersArray);

    return player;
}

export function saveUserStats(user: User, hits: number, miss: number) {
    const playersArray: StoredUser[] = getStore();
    const index = playersArray.findIndex((player) => player.name === user.name);
    if (index === -1) {
        alert(storageError);
        return;
    }
    const player = playersArray[index] as StoredUser;
    player.current_level = user.level;
    player.current_score = user.score;
    player.hit_count += hits;
    player.miss_count += miss;
    player.overall_accuracy =
        (player.hit_count * 100) / (player.hit_count + player.miss_count);
    if (player.best_score < user.score) {
        player.best_score = user.score;
    }
    playersArray.splice(index, 1, player);
    setStore(playersArray);
}

export function getTopPlayers(): StoredUser[] {
    const playersArray: StoredUser[] = getStore();
    playersArray.sort(
        (a: StoredUser, b: StoredUser) => b.best_score - a.best_score
    );
    return playersArray.slice(0, 3);
}
