/**
 * Represents a keyboard controller that listens to keydown events.
 */
export class Keyboard {

    private keydownCallback : (keyCode : string) => void;

    /**
     * Creates a new instance of the Keyboard class.
     */
    constructor(callback : (keyCode : string) => void) {
        this.keydownCallback = callback; // Store the callback func.
        document.addEventListener("keydown",(event) => this.keyControl(event));
    }

    /**
     * Handles the keydown event and logs the key code to the console.
     * @param event The KeyboardEvent object representing the keydown event.
     */
    private keyControl(event: KeyboardEvent) {
        const keyCode = event.key;
        this.keydownCallback(keyCode); // Invoke the provided callback with the key code
        console.log("KeyCode: " + event.key);
    }
}
