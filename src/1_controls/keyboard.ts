export class Keyboard {
    constructor() {
        document.addEventListener("keydown", this.keyControl.bind(this));
    }

    private keyControl(event: KeyboardEvent) {
        console.log("KeyCode: " + event.key);
    }
}
