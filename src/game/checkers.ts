import { ElementList } from "../schemas/interfaces";

export function isHTMLElement(el: unknown): el is HTMLElement {
    return el && typeof el === "object" && Reflect.get(el, "classList");
}

export function isVirus(targetElement: HTMLElement): boolean {
    return targetElement.classList.contains("virus");
}

export function isGamePlayable(el: unknown): el is ElementList {
    return (
        typeof el === "object" &&
        el !== null &&
        Object.values(el).every((value) => isHTMLElement(value))
    );
}
