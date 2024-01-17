import { mat4, vec3 } from "gl-matrix";
import { SGNode } from "../2_scenegraph/sgnode";
import { Transformation } from "../2_scenegraph/transformation";
import { Camera } from "../1_scene/camera";
import { KinematicsControls } from "./kinematics-controls";
import { PoseControl } from "../5_animation/pose_control";
import { RobotAnimation } from "../5_animation/robotanimation";
import {gl} from "../webgl2";

/**
 * Represents a keyboard controller that listens to keydown events.
 */
export class Keyboard {


  private identityMatrix = mat4.create();
  //private toRotate: Transformation[] = []; // Joints to rotate
  private root: SGNode;
  private animationRote : SGNode;
  private camera: Camera;
  private time : number;
 // private poseControl : PoseControl;
 // private robotAnimation : RobotAnimation;
 // private fps  = 500;

  /**
   * Creates a new instance of the Keyboard class.
   */
  constructor(private rotationMatrix: mat4, private kinematics?: KinematicsControls) {
    document.addEventListener("keydown", this.keyControl.bind(this));
    mat4.identity(this.identityMatrix);

  /*  const geometry = [
      [0.3, 0.35, 0.0], // Basis, Verschiebungsvektor zwischen jointBasis und joint1
      [0.0, 0.3, 0.0], // Link 1, Verschiebungsvektor zwischen joint1 und joint2
      [0.3, 0.0, 0.0], // Link 2, Verschiebungsvektor zwischen joint2 und joint3
      [0.3, 0.0, 0.0], // Link 3, Verschiebungsvektor zwischen joint3 und joint4
      [0.0, -0.3, 0.0], // Link 4, Verschiebungsvektor zwischen joint4 und joint5
    ]; *
    this.poseControl = new PoseControl(geometry);
    const ninetyDegrees = Math.PI / 2;
    this.poseControl.setStartAngles([-ninetyDegrees, ninetyDegrees, 0, ninetyDegrees, 0, ninetyDegrees]);
    this.robotAnimation = new RobotAnimation();
    this.robotAnimation.setStartAngles([-ninetyDegrees, ninetyDegrees, 0, ninetyDegrees, 0, ninetyDegrees]);
    */
  }

  public setNodesToRotate(root: SGNode, animationNode : SGNode, camera: Camera, nodes: Transformation[]): void {
    this.root = root;
   this.animationRote = animationNode;
    this.camera = camera;

    if(this.kinematics )
    {
      this.kinematics.setNodesToAnimate(this.root,this.animationRote,nodes);
    }
  }
 /* private oldAngles: number[] = [0,0,0,0,0,0];

  public updateJoints() {
    if (this.kinematics && this.toRotate.length >= 6) {
      const rootTransformation = vec3.create();
      mat4.getTranslation(rootTransformation, this.root.getTransformationMatrix());
      const xt = rootTransformation[0];
      const yt = rootTransformation[1];
      const zt = rootTransformation[2];

      console.log("xt"+xt);
      console.log("yt"+yt);
      console.log("zt"+zt);

      const angles = this.kinematics.inverse([xt, yt, zt, 0, 0, 0]);
      console.log(angles);
      let containsNaNs = false;
      angles.forEach(angle => {
        if(Number.isNaN(angle)){
          containsNaNs =true;
        }
      }); 

      if (containsNaNs == false) {
        // rotiere zurück um alle in oldAngles
        for(let i = 0; i < this.toRotate.length; i++) {
          //   this.toRotate[i].rotateZ(-this.oldAngles[i]);
          this.toRotate[i].rotateZ(angles[i]-this.oldAngles[i]);
        }
        this.oldAngles = angles;
      }
      /*
            if (!this.oldAngles) {
               this.oldAngles = [0,0,0,0,0,0];
            }
              const newAngles = this.kinematics.inverse([xt, yt, zt, 0, 0, 0]);
              console.log(newAngles);

              let containsNaNs = false;
              newAngles.forEach(angle => {
                if(Number.isNaN(angle)){
                  containsNaNs =true;
                }
              });

              if (containsNaNs == false) {
                // rotiere zurück um alle in oldAngles
                for(let i = 0; i < this.toRotate.length; i++) {
               //   this.toRotate[i].rotateZ(-this.oldAngles[i]);
                  this.toRotate[i].rotateZ(this.newAngles[i]);
                }
              }
              this.oldAngles=this.newAngles;
            } 
    }
  }


    /**
   * Do the right rotation and get it into the vertex shader.
   *
   * Handles the keydown event and logs the key code to the console.
   * @param event The KeyboardEvent object representing the keydown event.
   */
  private keyControl(event: KeyboardEvent) {
    // console.log("KeyCode: " + event.key);
    if (!this.root) {
      this.root = new SGNode();
    }
    switch (event.key) {
        // CAMERA AND CUBOID
      case "w":
       // this.move([0.00, 0.01, 0.0]);
        mat4.translate(this.root.getTransformationMatrix(),this.root.getTransformationMatrix(), [0.00, 0.01, 0.0]);
        this.kinematics.updateNodesToRotate();
        //this.updateJoints();
        break;
      case "a":
        mat4.translate(this.root.getTransformationMatrix(),this.root.getTransformationMatrix(), [-0.01, 0.00, 0.0]);
        this.kinematics.updateNodesToRotate();
       // this.move([-0.01, 0.0, 0.0]);
        break;
      case "s":
       // this.move([0.00, -0.01, 0.0]);
       mat4.translate(this.root.getTransformationMatrix(),this.root.getTransformationMatrix(), [0.00, -0.01, 0.0]);
        this.kinematics.updateNodesToRotate();
        break;
      case "d":
        mat4.translate(this.root.getTransformationMatrix(),this.root.getTransformationMatrix(), [0.01, 0.00, 0.0]);
        this.kinematics.updateNodesToRotate();
        //this.move([0.01, 0.0, 0.0]);
        break;
      case "q":
        mat4.translate(this.root.getTransformationMatrix(),this.root.getTransformationMatrix(), [0.00, 0.0, -0.01]);
        this.kinematics.updateNodesToRotate();
      //  this.move([0.00, 0.0, -0.01]);
        break;
      case "e":
        mat4.translate(this.root.getTransformationMatrix(),this.root.getTransformationMatrix(), [0.00, 0.0, 0.01]);
        this.kinematics.updateNodesToRotate();
      //  this.move([0.00, 0.0, 0.01]);
        break;
        case "x":
          if(this.kinematics)
          {
            this.animateTimeBased();
          }
        // CAMERA ZOOM
      case "ArrowUp":
        this.camera.zoom(0.05);
        break;
      case "ArrowDown":
        this.camera.zoom(-0.05);
        break;
        /*  case "ArrowLeft":
            this.camera.zoom(0.05);
            break;
          case "ArrowRight":
            this.camera.getTransformationMatrix
            break;*/
    }
  }

  public setTime(time : number)
  {
    this.time = time;
  }

  public animateTimeBased()
  {
    this.kinematics.calculateAnimationTimeBased(this.time);
  }


 /* private move(movement : number[]): void{
    const step : vec3 = vec3.create();
    step[0] = movement[0]/this.fps;
    step[1] = movement[1]/this.fps;
    step[2] = movement[2]/this.fps;
    for (let i = 0; i < this.fps; i++) {
      mat4.translate(this.root.getTransformationMatrix(),this.root.getTransformationMatrix(), step);
      this.updateJoints();
    }
  }*/
}
