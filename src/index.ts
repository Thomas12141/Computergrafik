import { Scene } from "./1_scene/scene";

import Stats = require("stats.js");

const stats = new Stats();
stats.showPanel( 1 ); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild( stats.dom );

const scene = new Scene();

function drawAnimatedScene() {
    stats.begin();
    scene.draw();
    stats.end();

    requestAnimationFrame(drawAnimatedScene);
}

drawAnimatedScene();







