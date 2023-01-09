import { Scene } from "./scene/scene";

const scene = new Scene();

function drawAnimatedScene() {
    scene.draw();
    requestAnimationFrame(drawAnimatedScene);
}

drawAnimatedScene();







