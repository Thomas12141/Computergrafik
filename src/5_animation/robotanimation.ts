export class RobotAnimation {
    private targetAngles: number[] = [0, 0, 0, 0, 0, 0];
    private startAngles: number[] = [0, 0, 0, 0, 0, 0];
    private steps2go = 0;
    private _reached = true;

    /**
     * Constructs a new instance of the RobotAnimation class.
     */
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    constructor() {
    }
    
    /**
     * True if target was reached. False otherwise.
     * @returns Boolean. 
     */
    public get reached(): boolean {
        return this._reached;
    }

    /**
     * Sets the starting angle position of the robot (if needed).
     * @param startAngles The starting position as an array of numbers.
     */
    public setStartAngles(startAngles: number[]): void {
        this.startAngles = startAngles;
        this._reached = true;
    }

    /**
     * Sets the target angle position for the robot to move to
     *  and initializes all values vor animation. 
     * Remember: Target angle position can be computed based on a target pose by inverse kinematics.
     * @param targetAngles The target angle as an array of numbers.
     * @param steps Amount of steps (frames) to complete animation.
     */
    public init(targetAngles: number[], steps = 100): void {
        this.targetAngles = targetAngles;
        this._reached = false;
        this.steps2go = steps;

        console.warn("Target Angles: ", this.targetAngles);
        console.warn("Start Angles: ", this.startAngles);

        if (this.targetAngles.includes(NaN)) {
            console.warn("No solution found!");
            this._reached = true;
        }    
    }

    /**
     * Moves the robot one step closer to the target position.
     * @returns The current position of the robot as an array of numbers.
     */
    public moveStep(): number[] {

        this.steps2go--;

        if (this.steps2go<=0) {
            this._reached = true;
            return this.targetAngles;
        }
        for (let i = 0; i < this.startAngles.length; i++) {
            const angle = this.targetAngles[i] - this.startAngles[i];
            this.startAngles[i] += angle / this.steps2go;
        }

        return this.startAngles;
    }

}
