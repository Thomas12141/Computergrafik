import { Scene } from "./1_scene/scene";
import * as Stats from "stats.js";

/**
 * Represents an animated scene.
 */
class AnimatedScene {
    private stats: Stats;
    private scene: Scene;
    private time = 0;
    private steps = 0;

    /**
     * Initializes a new instance of the AnimatedScene class.
     */
    constructor() {
        document.addEventListener("keydown", this.keyControl.bind(this));
        this.stats = new Stats();
        this.stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
        document.body.appendChild(this.stats.dom);
        this.scene = new Scene();
    }



    /**
     * Draws the scene.
     */
    public draw( jetzt :number) {

        jetzt *= 0.001;
        const delTime = jetzt - this.time;

        this.stats.begin();
        if(this.steps>0){
            this.scene.keyboard.animateTimeBased();
        }
        this.scene.draw(delTime); // <--- Praktikum 1
        this.stats.end();
        
        requestAnimationFrame((jetzt) => this.draw(jetzt));
        this.time = jetzt;
        
    }

    private keyControl(event: KeyboardEvent) {
        if(event.key === "b"){
            this.steps = 120;
        }
    }
}


const animatedScene = new AnimatedScene();
// animatedScene.draw();
requestAnimationFrame((jetzt) => animatedScene.draw(jetzt));
