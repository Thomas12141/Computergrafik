import { mat4, vec3 } from "gl-matrix";
import { SGNode } from "../2_scenegraph/sgnode";
import { Transformation } from "../2_scenegraph/transformation";
import { Camera } from "../1_scene/camera";
import { KinematicsControls } from "./kinematics-controls";
import { PoseControl } from "../5_animation/pose_control";
import { RobotAnimation } from "../5_animation/robotanimation";

/**
 * Represents a keyboard controller that listens to keydown events.
 */
export class Keyboard {


  private identityMatrix = mat4.create();
  private toRotate: Transformation[] = []; // Joints to rotate
  private root: SGNode;
  private camera: Camera;
  private poseControl : PoseControl;
  private robotAnimation : RobotAnimation;

  /**
   * Creates a new instance of the Keyboard class.
   */
  constructor(private rotationMatrix: mat4, private kinematics?: KinematicsControls) {
    document.addEventListener("keydown", this.keyControl.bind(this));
    mat4.identity(this.identityMatrix);

    const geometry = [
      [0.3, 0.35, 0.0], // Basis, Verschiebungsvektor zwischen jointBasis und joint1
      [0.0, 0.3, 0.0], // Link 1, Verschiebungsvektor zwischen joint1 und joint2
      [0.3, 0.0, 0.0], // Link 2, Verschiebungsvektor zwischen joint2 und joint3
      [0.3, 0.0, 0.0], // Link 3, Verschiebungsvektor zwischen joint3 und joint4
      [0.0, -0.3, 0.0], // Link 4, Verschiebungsvektor zwischen joint4 und joint5
    ];
    this.poseControl = new PoseControl(geometry);
    const ninetyDegrees = Math.PI / 2;
    this.poseControl.setStartAngles([-ninetyDegrees, ninetyDegrees, 0, ninetyDegrees, 0, ninetyDegrees]);
    this.robotAnimation = new RobotAnimation();
    this.robotAnimation.setStartAngles([-ninetyDegrees, ninetyDegrees, 0, ninetyDegrees, 0, ninetyDegrees]);
  }

  public setNodesToRotate(root: SGNode, camera: Camera, nodes: Transformation[]): void {
    this.root = root;
    this.toRotate = nodes;
    this.camera = camera;
  }
  private oldAngles: number[] = [0,0,0,0,0,0];

  private updateJoints() {
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
            } */
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
        mat4.translate(this.root.getTransformationMatrix(),this.root.getTransformationMatrix(), [0.00, 0.01, 0.0]);
        this.updateJoints();
        break;
      case "a":
        mat4.translate(this.root.getTransformationMatrix(),this.root.getTransformationMatrix(),[-0.01, 0.0, 0.0]);
        this.updateJoints();
        break;
      case "s":
        mat4.translate(this.root.getTransformationMatrix(),this.root.getTransformationMatrix(), [0.00, -0.01, 0.0]);
        this.updateJoints();
        break;
      case "d":
        mat4.translate(this.root.getTransformationMatrix(),this.root.getTransformationMatrix(), [0.01, 0.0, 0.0]);
        this.updateJoints();
        break;
      case "q":
        mat4.translate(this.root.getTransformationMatrix(),this.root.getTransformationMatrix(), [0.00, 0.0, -0.01]);
        this.updateJoints();
        break;
      case "e":
        mat4.translate(this.root.getTransformationMatrix(),this.root.getTransformationMatrix(), [0.00, 0.0, 0.01]);
        this.updateJoints();
        break;
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
}
