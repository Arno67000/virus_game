export class Board {
    private canva: HTMLElement;
    private menuArea: HTMLElement;
    private loginForm: HTMLElement;
    private input: HTMLInputElement;
    private submit: HTMLElement;

    constructor(
        canva: HTMLElement,
        menuArea: HTMLElement,
        loginForm: HTMLElement,
        input: HTMLInputElement,
        submit: HTMLElement
    ) {
        this.canva = canva;
        this.menuArea = menuArea;
        this.loginForm = loginForm;
        this.input = input;
        this.submit = submit;
    }

    prepare() {
        this.canva.setAttribute("hidden", "true");
        this.menuArea.setAttribute("hidden", "true");
    }

    async getUsername(): Promise<string> {
        return new Promise<string>((resolve) => {
            this.input.addEventListener("keyup", (e) => {
                const value = this.input.value.toUpperCase();
                if (e.key === "Enter" && value.length > 0) {
                    this.clear();
                    resolve(this.input.value.toUpperCase());
                }
            });
            this.submit.addEventListener("click", () => {
                const value = this.input.value.toUpperCase();
                if (value.length > 0) {
                    this.clear();
                    resolve(this.input.value.toUpperCase());
                }
            });
        });
    }

    clear() {
        this.input.value = "";
        this.input.replaceWith(this.input.cloneNode());
        this.submit.replaceWith(this.submit.cloneNode());
        this.loginForm.remove();
        this.canva.removeAttribute("hidden");
        this.menuArea.removeAttribute("hidden");
    }
}
