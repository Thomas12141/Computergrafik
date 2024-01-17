import { mat4, vec3 } from "gl-matrix";
import { SGNode } from "../2_scenegraph/sgnode";
import { Transformation } from "../2_scenegraph/transformation";

export class KinematicsControls {
    
  private angles: number[] = [];
  private Kinematics: any;
  private RobotKin: any;
  private geometry : number[][];

  private poseNode : SGNode;
  private animationNode : SGNode;
  private nodes : Transformation[] = [];

  /**
   * Creates a new instance of the KinematicsControls class.
   */
  constructor() {
    this.initKinematics();
  }

  public initKinematics() {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      this.Kinematics = require("kinematics").default;

      /*
      geometry 3 and 4 must be one dimensional geo[3] = [a,0,0] geo[4] = [0,b,0]
      at new Kinematics (kinematics.js:23:1)

      /**
       * Von hier aus beschreiben Sie die Verschiebungsvektoren zwischen den Joints in Weltkoordinaten.
       * 
       * Die Verschiebungsvektoren sollten Sie aus der Länge der Links bzw.
       * Länge und Breite der Basis ableiten können.
       * 
       * The y,z of V3 and x,z of V4 must be 0 for the kinematics to work.
       */
      const ninetyDegrees = Math.PI / 2;

      /**
       * Werte der Joints und Transformationen:
       
        jointBasis  = new Joint(0.1, 0.1)
        basis       = new Cuboid(0.6, 0.4, 0.3)
        joint1      = new Joint(0.1, 0.1)
        link1       = new Link(0.3, 0.1, 0.1)
        joint2      = new Joint(0.1, 0.1)
        link2       = new Link(0.3, 0.1, 0.1)
        joint3      = new Joint(0.1, 0.1)
        link3       = new Link(0.3, 0.1, 0.1)
        joint4      = new Joint(0.1, 0.1)
        link4       = new Link(0.3, 0.1, 0.1)
        joint5      = new Joint(0.1, 0.1)
        poseCuboid  = new Cuboid(0.1, 0.1, 0.1)             // Testwürfel und Root der Bewegung

        jointBasisTransformation.setPosition([0.0, 0.0, 0.0]);
        basisTransformation.setPosition([0.0, 0.0, 0.2]);
        joint1Transformation.setPosition([0.3, 0.15, 0.0]);
        joint2Transformation.setPosition([0.15, 0.0, 0.0]);
        link1Transformation.setPosition([0.15, 0.0, 0.0]);
        link2Transformation.setPosition([0.15, 0.0, 0.0]);
        joint3Transformation.setPosition([0.0, 0.0, 0.15]);
        link3Transformation.setPosition([0.15, 0.0, 0.0]);
        joint4Transformation.setPosition([0.15, 0.0, 0.0]);
        link4Transformation.setPosition([0.15, 0.0, 0.0]);
        joint5Transformation.setPosition([0.0, 0.0, 0.15]);
        poseCuboidTransformation.setPosition([0.0, 0.0, 0.05]);
       */

      const geometry = [
        [0.3, 0.35, 0.0], // Basis, Verschiebungsvektor zwischen jointBasis und joint1
        [0.0, 0.3, 0.0], // Link 1, Verschiebungsvektor zwischen joint1 und joint2
        [0.3, 0.0, 0.0], // Link 2, Verschiebungsvektor zwischen joint2 und joint3
        [0.3, 0.0, 0.0], // Link 3, Verschiebungsvektor zwischen joint3 und joint4
        [0.0, -0.3, 0.0], // Link 4, Verschiebungsvektor zwischen joint4 und joint5
      ];

      this.RobotKin = new this.Kinematics(geometry);

      this.angles = [-ninetyDegrees, ninetyDegrees, 0, ninetyDegrees, 0, ninetyDegrees];
      const pose = this.RobotKin.forward(...this.angles)[5];
      this.angles = this.RobotKin.inverse(...pose);
    }

    public setNodesToAnimate(pose : SGNode,animate: SGNode,nodes: Transformation[])
    {
      this.poseNode = pose;
      this.animationNode = animate;
      this.nodes = nodes;
    }

    public time = 1;
    public async calculateAnimation()
    {
      if(!this.poseNode || !this.animationNode)
      {
        return;
      }

      const n = 100;

      const poseNodePos = vec3.create();
      mat4.getTranslation(poseNodePos,this.poseNode.getTransformationMatrix());

      const animationNodePos = vec3.create();
      mat4.getTranslation(animationNodePos,this.animationNode.getTransformationMatrix());

      const diff = vec3.create();
      vec3.subtract(diff,animationNodePos,poseNodePos);

      vec3.scale(diff, diff,1/n);


      for(let i = n; i > 0; i--)
      {
        mat4.translate(this.poseNode.getTransformationMatrix(),this.poseNode.getTransformationMatrix(),diff);
        this.updateNodesToRotate();
        await new Promise(f => setTimeout(f,10));
      }
    }

    public prevTime : number;
    public currTime : number;
    public timeWindow  = 1;
    public alreadyCalculated = false;
    public startMoving = false;

    public poseNodePos : vec3;
    public animationNodePos : vec3;
    public diff : vec3;

    public calculateAnimationTimeBased(time : number)
    {
      if(!this.poseNode || !this.animationNode)
      {
        return;
      }
      if(!this.alreadyCalculated)
      {
        this.alreadyCalculated = true;
        this.poseNodePos = vec3.create();
        this.animationNodePos = vec3.create();
        this.diff = vec3.create();
      }

      mat4.getTranslation(this.poseNodePos,this.poseNode.getTransformationMatrix());
      mat4.getTranslation(this.animationNodePos,this.animationNode.getTransformationMatrix());
      
      vec3.subtract(this.diff,this.animationNodePos,this.poseNodePos);
      vec3.scale(this.diff,this.diff,time/this.timeWindow);

      mat4.translate(this.poseNode.getTransformationMatrix(),this.poseNode.getTransformationMatrix(),this.diff);
      this.updateNodesToRotate();
    }

    private oldAngles : number[] = [0,0,0,0,0,0];

    public updateNodesToRotate()
    {
      if(this.nodes.length >= 6)
      {
        const poseTransform = vec3.create();
        mat4.getTranslation(poseTransform,this.poseNode.getTransformationMatrix());
        const xt = poseTransform[0];
        const yt = poseTransform[1];
        const zt = poseTransform[2];

        const  angles = this.inverse([xt,yt,zt,0,0,0]);
        let containsNaNs = false;
        angles.forEach(angle =>{
          if(Number.isNaN(angle)){
            containsNaNs = true;
          }
        });

        if(containsNaNs == false)
        {
          for(let i = 0; i < this.nodes.length; i++)
          {
            this.nodes[i].rotateZ(angles[i] - this.oldAngles[i]);
          }
          this.oldAngles = angles;
        }
      }
    }

  public getGeometry(): number [][]
  {
    return this.geometry;
  }


    public getAngles(): number[] {
      return this.angles;
    }

    public inverse(pose: number[]): number[] {
      this.angles = this.RobotKin.inverse(...pose);
      return this.getAngles();
    }
    
}