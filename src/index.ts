import { Scene } from "./1_scene/scene";

const scene = new Scene();

function drawAnimatedScene() {
    scene.draw();
    requestAnimationFrame(drawAnimatedScene);
}

drawAnimatedScene();







