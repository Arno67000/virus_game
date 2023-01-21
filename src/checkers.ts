export function isHTMLElement(el: unknown): el is HTMLElement {
    return el && typeof el === "object" && Reflect.get(el, "classList");
}
export function isVirus(targetElement: HTMLElement): boolean {
    return targetElement.classList.contains("virus");
}
