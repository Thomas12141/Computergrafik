export class KeyboardDemo {


    registerEvents() {
        document.addEventListener('keydown', function (event) { Key.keyControl(event); });

        let Key = {
            keyboardDemo: this,
            keyControl: function (event: KeyboardEvent) {
                this.keyboardDemo.doSomething(event.key);
            }
        }

    }
    

    doSomething(code: String) {
        console.log('KeyCode: ' + code);
    }

}
