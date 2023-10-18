import { Scene } from "./1_scene/scene";
import * as Stats from "stats.js";

class AnimatedScene {
    private stats: Stats;
    private scene: Scene;

    constructor() {
        this.stats = new Stats();
        this.stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
        document.body.appendChild(this.stats.dom);

        this.scene = new Scene();
    }

    public draw() {
        this.stats.begin();
        this.scene.draw();
        this.stats.end();

        requestAnimationFrame(() => this.draw());
    }
}

const animatedScene = new AnimatedScene();
animatedScene.draw();
