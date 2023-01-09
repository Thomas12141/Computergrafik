export class Keyboard {

    constructor() {
        document.addEventListener('keydown', function (event) { Key.keyControl(event); });

        const Key = {
            keyboard: this,
            keyControl: function (event: KeyboardEvent) {
                console.log('KeyCode: ' + event.key);
            }
        };
    }

}
