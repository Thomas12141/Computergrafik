import { mat4 } from "gl-matrix";

/**
 * A stack of matrices used for hierarchical transformations in a scene graph.
 */
export class MatrixStack {
    private matrixStack: mat4[] = [];

    /**
     * Constructs a new MatrixStack.
     */
    constructor() {
        this.matrixStack.push(mat4.create());
    }

    /**
     * Pushes a matrix onto the stack.
     * @param mat - The matrix to push onto the stack.
     */
    public push(mat: mat4): void {
        this.matrixStack.push(mat4.clone(mat));
    }

    /**
     * Pops a matrix from the stack.
     * @returns The matrix that was popped from the stack.
     */
    public pop(): mat4 {
        return mat4.clone(this.matrixStack.pop());
    }

    public peak(): mat4 {
        return mat4.clone(this.matrixStack.at(-1));
    }

    public length(): number {
        return this.matrixStack.length;
    }
}
