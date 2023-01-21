export class Virus {
    private image: HTMLImageElement;
    private size: number;
    private offsetX: number;
    private offsetY: number;

    constructor(source: string, canva: HTMLElement) {
        this.size = Math.random() * 45 + 30;
        this.offsetX =
            this.randomize(canva.clientHeight) - this.size / 2 || this.size;
        this.offsetY =
            this.randomize(canva.clientHeight) - this.size / 2 || this.size;

        this.image = new Image();
        this.image.src = source;
        this.image.classList.add("virus");
        this.image.style.setProperty("--x", `${this.size}px`);
        this.image.style.setProperty("--y", `${this.size}px`);
        this.image.style.setProperty("--top", `${this.offsetX}px`);
        this.image.style.setProperty("--left", `${this.offsetY}px`);
        this.image.style.setProperty(
            "--trX",
            `${this.defineTranslate(canva.clientWidth, this.offsetY)}px`
        );
        this.image.style.setProperty(
            "--trY",
            `${this.defineTranslate(canva.clientHeight, this.offsetX)}px`
        );
    }
    get(): HTMLImageElement {
        return this.image;
    }

    private defineTranslate(size: number, offset: number) {
        const translate = this.randomize(this.size) * this.maybeMinus();
        if (
            translate + offset + this.size < 0 ||
            translate + offset + this.size > size
        ) {
            return -offset + this.size;
        } else {
            return translate;
        }
    }
    private randomize = (number: number): number => Math.random() * number;
    private maybeMinus = (): number => (this.randomize(1) < 0.5 ? -1 : 1);
}
