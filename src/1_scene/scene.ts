import { Triangle } from "../3_shapes/triangle";
import { Quadrangle } from "../3_shapes/quadrangle";
import { Cuboid } from "../3_shapes/cuboid";
import { Keyboard } from "../1_controls/keyboard";
import { gl, shaderProgram } from "../webgl2";
import { mat4, vec3 } from "gl-matrix";
import { Scenegraph } from "../2_scenegraph/scenegraph";
import { Joint } from "../2_scenegraph/joint"; 
import { Link } from "../2_scenegraph/link";
import { Transformation } from "../2_scenegraph/transformation";
import { Camera } from "./camera";
import { KinematicsControls } from "../1_controls/kinematics-controls";
import { Light } from "../4_material_light/light";
import { Material } from "../4_material_light/material";

/**
 * Represents a scene to be rendered in WebGL.
 */
export class Scene {
    /** The uniform location of the projection matrix. */
    private readonly pMatrixUniform: WebGLUniformLocation;

    /** The uniform location of the model view matrix. */
    private readonly mvMatrixUniform: WebGLUniformLocation;

    /** The uniform location of the rotation matrix. */
    private readonly rMatrixUniform: WebGLUniformLocation;

    /** The model view matrix. */
    private modelViewMatrix: mat4;

    /** The projection matrix. */
    private projectionMatrix: mat4;

    /** The rotation matrix. */
    private rotationMatrix: mat4;

    /** The triangle to be drawn in the scene. */
    private triangle: Triangle;

    /** The quadrangle to be drawn in the scene. */
    private quadrangle: Quadrangle;

    /** The cuboid to be drawn in the scene. */
    private cuboid: Cuboid;

    /** The keyboard controls. */
    private readonly keyboard: Keyboard;

    private scenegraph: Scenegraph;

    private pointLight = new Light([0.0,0.0,0.0,1.0], [1.0, 1.0, 1.0, 1.0], [1.0, 1.0, 1.0, 1.0], [1.0, 1.0, 1.0, 1.0]);
    private chromeMaterial = new Material([0.25, 0.25, 0.25, 1.0], [0.2, 0.2, 0.2, 1.0], [0.54, 0.54, 0.54, 1.0], [0.66, 0.66, 0.66, 1.0], 32.0);

    private camera: Camera;
    private cameraTransformation = new Transformation();
    private kinematics: KinematicsControls;

    private jointBasis = new Joint("Joint-Quader", 0.1, 0.1); // Quader2
    private basis = new Cuboid(0.6, 0.4, 0.3,this.chromeMaterial); // Quader1
    private joint1 = new Joint("Joint 1", 0.1, 0.1); // Zylinder1
    private link1 = new Link("Link 1",  0.3, 0.1, 0.1); // Quader3
    private joint2 = new Joint("Joint 2",  0.1, 0.1); // Zylinder2
    private link2 = new Link("Link 2",  0.3, 0.1, 0.1); // Quader4
    private joint3 = new Joint("Joint 3", 0.1, 0.1); // Zylinder3
    private link3 = new Link("Link 3",  0.3, 0.1, 0.1); // Quader5
    private joint4 = new Joint("Joint 4",  0.1, 0.1); // Zylinder4
    private link4 = new Link("Link 4",  0.3, 0.1, 0.1); // Quader6
    private joint5 = new Joint("Joint 5",  0.1, 0.1); // Zylinder5

    private poseCuboid = new Cuboid(0.1, 0.1, 0.1,this.chromeMaterial); // Testwürfel

    private jointBasisTransformation = new Transformation();
    private basisTransformation = new Transformation();
    private joint1Transformation = new Transformation();
    private link1Transformation = new Transformation();
    private joint2Transformation = new Transformation();
    private link2Transformation = new Transformation();
    private joint3Transformation = new Transformation();
    private link3Transformation = new Transformation();
    private joint4Transformation = new Transformation();
    private link4Transformation = new Transformation();
    private joint5Transformation = new Transformation();
    private poseCuboidTransformation = new Transformation();

    /**
     * Creates a new Scene object.
     */
    public constructor() {
        this.camera = new Camera();
        this.cameraTransformation.setPosition([0.0, 0.0, -1.0]);

        this.kinematics = new KinematicsControls();

        this.updateViewport();

        this.pMatrixUniform = gl.getUniformLocation(shaderProgram, "uProjectionMatrix");
        this.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uModelViewMatrix");

        this.modelViewMatrix = mat4.create();
        this.projectionMatrix = this.camera.getProjectionMatrix();

        this.keyboard = new Keyboard(this.modelViewMatrix, this.kinematics);

        // Zusammensetzen eines Dreiecks
        this.initTriangle();

        // Zusammensetzen eines Rechtecks aus zwei Dreiecken
        this.initQuadrangle();

        // Zusammensetzen eines Quaders aus Rechtecks
        this.initCuboid();

        // Initialisiere den Szenegraphen
        this.initScenegraph();
    }

    /**
     * Draws the scene.
     */
    public draw(): void {
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    
        this.projectionMatrix = this.camera.getProjectionMatrix();
        gl.uniformMatrix4fv(this.pMatrixUniform, false, this.projectionMatrix);
        gl.uniformMatrix4fv(this.mvMatrixUniform, false, this.modelViewMatrix);
        
        this.updateViewport();
        
        this.drawScenegraph();
    }

    /** Praktikum 2 und 3 */
    public updateViewport() {
        gl.canvas.width = window.innerWidth;
        gl.canvas.height = window.innerHeight;
        
        gl.viewport(0, 0, window.innerWidth, window.innerHeight);

        this.camera.setAspect(window.innerWidth / window.innerHeight);
    }

    // Does not work in this order with the other transformations!
    private rotateWithTransformations() {
        this.jointBasisTransformation.rotateX(-Math.PI / 2);
        this.joint1Transformation.rotateX(Math.PI / 2);
        this.joint3Transformation.rotateY(Math.PI / 2);
        this.link3Transformation.rotateY(-Math.PI / 2);
        this.joint4Transformation.rotateY(0 / 2);
        this.link4Transformation.rotateY(0 / 2);
    }

    private jointsTransformations: mat4[] = [];

    private initScenegraph() {
        // Rotate the joints
        this.jointBasisTransformation.rotateX(-Math.PI / 2);
        this.jointBasisTransformation.setPosition([0.0, 0.0, 0.0]);

        this.basisTransformation.setPosition([0.0, 0.0, 0.2]);

        this.joint1Transformation.rotateX(Math.PI / 2);
        this.joint1Transformation.setPosition([0.3, 0.15, 0.0]);

        
        this.link1Transformation.rotateZ(Math.PI / 2);
        this.link1Transformation.setPosition([0.15, 0.0, 0.0]);
        this.joint2Transformation.setPosition([0.15, 0.0, 0.0]);
        this.link2Transformation.rotateZ(-Math.PI / 2);
        this.link2Transformation.setPosition([0.15, 0.0, 0.0]);

        this.joint3Transformation.rotateY(Math.PI / 2);
        this.joint3Transformation.setPosition([0.0, 0.0, 0.15]);
       
        this.link3Transformation.rotateY(-Math.PI / 2);
        this.link3Transformation.setPosition([0.15, 0.0, 0.0]);

        this.joint4Transformation.rotateY(0 / 2);
        
        this.joint4Transformation.setPosition([0.15, 0.0, 0.0]);
        this.link4Transformation.rotateZ(-Math.PI / 2);

        this.link4Transformation.rotateY(0 / 2);
        this.link4Transformation.setPosition([0.15, 0.0, 0.0]);

        this.joint5Transformation.rotateY(Math.PI / 2);
        this.joint5Transformation.setPosition([0.0, 0.0, 0.15]);

        this.poseCuboidTransformation.setPosition([1.0, 0.0 , 0.0]);

        // Build the scene
        this.poseCuboidTransformation.addChild(this.poseCuboid);

        this.joint5Transformation.addChild(this.joint5);

        this.link4.addChild(this.joint5Transformation);
        this.link4Transformation.addChild(this.link4);

        this.joint5Transformation.addChild(this.pointLight);

        this.joint4.addChild(this.link4Transformation);
        this.joint4Transformation.addChild(this.joint4);

        this.link3.addChild(this.joint4Transformation);
        this.link3Transformation.addChild(this.link3);

        this.joint3.addChild(this.link3Transformation);
        this.joint3Transformation.addChild(this.joint3);

        this.link2.addChild(this.joint3Transformation);
        this.link2Transformation.addChild(this.link2);

        this.joint2.addChild(this.link2Transformation);
        this.joint2Transformation.addChild(this.joint2);

        this.link1.addChild(this.joint2Transformation);
        this.link1Transformation.addChild(this.link1);

        this.joint1.addChild(this.link1Transformation);
        this.joint1Transformation.addChild(this.joint1);

        this.basis.addChild(this.joint1Transformation);
        this.basisTransformation.addChild(this.basis);
        this.jointBasis.addChild(this.basisTransformation);
        this.jointBasisTransformation.addChild(this.jointBasis);

        this.camera.addChild(this.poseCuboidTransformation);
        this.camera.addChild(this.jointBasisTransformation);
        this.cameraTransformation.addChild(this.camera);

        this.keyboard.setNodesToRotate(this.poseCuboidTransformation, this.camera,
            [
                this.jointBasisTransformation, this.joint1Transformation,
                this.joint2Transformation, this.joint3Transformation,
                this.joint4Transformation, this.joint5Transformation
            ]);
        this.scenegraph = new Scenegraph(this.cameraTransformation, this.modelViewMatrix);
    }

    private drawScenegraph() {
        this.scenegraph.draw();
        this.pointLight.draw();
    }

    /** Praktikum 1 */

    private initTriangle(): void {
        const v1 = vec3.create();
        vec3.set(v1, -0.75, 0.75, 0.0);

        const v2 = vec3.create();
        vec3.set(v2, -0.75, -0.75, 0.0);

        const v3 = vec3.create();
        vec3.set(v3, 0.75, -0.75, 0.0);

        this.triangle = new Triangle(v1, v2, v3,this.chromeMaterial);
    }

    private initQuadrangle(): void {
        const v1 = vec3.create();
        vec3.set(v1, -0.75, 0.75, 0.0);

        const v2 = vec3.create();
        vec3.set(v2, -0.75, -0.75, 0.0);

        const v3 = vec3.create();
        vec3.set(v3, 0.75, -0.75, 0.0);

        const v4 = vec3.create();
        vec3.set(v4, 0.75, 0.75, 0.0);

        this.quadrangle = new Quadrangle(v1, v2, v3, v4,this.chromeMaterial);
    }

    private initCuboid(): void {
        this.cuboid = new Cuboid(0.5,2.0,1.0,this.chromeMaterial);
    }

    private drawAufgabe1(): void {
        this.triangle.draw();
    }

    private drawAufgabe2(): void {
        this.quadrangle.draw();
     }

    private drawAufgabe3(): void {
        this.cuboid.draw();
    }
}
