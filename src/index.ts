import { Scene } from "./1_scene/scene";
import * as Stats from "stats.js";

/**
 * Represents an animated scene.
 */
class AnimatedScene {
    private stats: Stats;
    private scene: Scene;
    private time = 0;

    /**
     * Initializes a new instance of the AnimatedScene class.
     */
    constructor() {
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
        this.scene.draw(delTime); // <--- Praktikum 1
        this.stats.end();
        
        requestAnimationFrame((jetzt) => this.draw(jetzt));
        this.time = jetzt;
        
    }
}

const animatedScene = new AnimatedScene();
// animatedScene.draw();
requestAnimationFrame((jetzt) => animatedScene.draw(jetzt));
