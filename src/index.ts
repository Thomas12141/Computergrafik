import {Scene} from "./scene/scene";

let scene = new Scene();

function drawAnimatedScene()
{
    scene.draw();
    requestAnimationFrame(drawAnimatedScene);
} 

drawAnimatedScene();




    


