import { Scene } from "./1_scene/scene";

import * as Stats from "stats.js";

const stats = new Stats();
stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom);

const scene = new Scene();

function drawAnimatedScene() {
    stats.begin();
    scene.draw();
    stats.end();

    requestAnimationFrame(drawAnimatedScene);
}

drawAnimatedScene();







