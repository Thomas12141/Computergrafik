import { mat4 } from "gl-matrix";
import { SGNode } from "../2_scenegraph/sgnode";

export class Camera extends SGNode {

    /*
     * z-Buffer wird genutzt, um die Tiefeninformation von Objekten aus einer Perspektive zu cachen
     * (Polygone, die nicht verdeckt werden)
     * hier ist der z-Buffer aktiviert (siehe webgl2.ts)
    */

    private projectionMatrix: mat4;

    /** Default values for perspective */
    private fov = Math.PI / 2; // used for zooming
    private aspect = 1.0;
    private near = 0.1;
    private far = 20.0;

    /**
     * Creates a Camera.
     * @param f Farplane
     * @param n Nearplane
     */
    constructor() {
        super();
        this.projectionMatrix = mat4.create();
    }

    public zoom(zoomFactor: number) {
        this.fov += zoomFactor;
    }

    public resetZoom() {
        this.fov = Math.PI / 2;
    }

    /**
     * In case the window size is changed.
     */
    public setAspect(aspect: number) {
        this.aspect = aspect;
    }

    public setPerspectiveParams(fov: number, aspect: number, near: number, far: number) {
        this.fov = fov;
        this.aspect = aspect;
        this.near = near;
        this.far = far;
    }

    public getProjectionMatrix(): mat4 {
        this.projectionMatrix = mat4.perspective(this.projectionMatrix, this.fov, this.aspect, this.near, this.far);
        return this.projectionMatrix;
    }
  }