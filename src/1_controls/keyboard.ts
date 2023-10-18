/**
 * Represents a keyboard controller that listens to keydown events.
 */
export class Keyboard {
    /**
     * Creates a new instance of the Keyboard class.
     */
    constructor() {
        document.addEventListener("keydown", this.keyControl.bind(this));
    }

    /**
     * Handles the keydown event and logs the key code to the console.
     * @param event The KeyboardEvent object representing the keydown event.
     */
    private keyControl(event: KeyboardEvent) {
        console.log("KeyCode: " + event.key);
    }
}
