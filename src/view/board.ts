import { ElementList } from "../schemas/interfaces";

export class Board {
    private canva: HTMLElement;
    private menuArea: HTMLElement;
    private loginForm: HTMLElement;
    private input: HTMLInputElement;
    private restart: HTMLInputElement;
    private submit: HTMLElement;

    constructor(elements: ElementList) {
        this.canva = elements.canva;
        this.menuArea = elements.menuArea;
        this.loginForm = elements.loginForm;
        this.input = elements.input;
        this.restart = elements.checkbox;
        this.submit = elements.submit;
    }

    prepare() {
        this.canva.style.opacity = "0";
        this.menuArea.style.opacity = "0";
    }

    async getUsername(): Promise<{ name: string; restart: boolean }> {
        return new Promise<{ name: string; restart: boolean }>((resolve) => {
            this.input.addEventListener("keyup", (e) => {
                const restart = this.restart.checked;
                const name = this.input.value.toUpperCase();
                if (e.key === "Enter" && name.length > 0) {
                    this.clear();
                    resolve({ name, restart });
                }
            });
            this.submit.addEventListener("click", () => {
                const restart = this.restart.checked;
                const name = this.input.value.toUpperCase();
                if (name.length > 0) {
                    this.clear();
                    resolve({ name, restart });
                }
            });
        });
    }

    clear() {
        this.restart.checked = false;
        this.restart.replaceWith(this.restart.cloneNode());
        this.input.value = "";
        this.input.replaceWith(this.input.cloneNode());
        this.submit.replaceWith(this.submit.cloneNode());
        this.loginForm.remove();
        this.canva.style.opacity = "1";
        this.menuArea.style.opacity = "1";
    }
}
