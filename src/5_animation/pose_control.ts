// eslint-disable-next-line @typescript-eslint/no-var-requires
const Kinematics = require('kinematics').default;

export class PoseControl {
    private targetAngles: number[] = [];
    private robotKin: any;
    private stepper: number[] = [];
    private startAngles: number[] = [0, 0, 0, 0, 0, 0];
    public reached = true;

    /**
     * Constructs a new instance of the RobotMove class.
     * @param geometry The geometry of the robot.
     */
    constructor(private geometry: number[][]) {
        this.robotKin = new Kinematics(this.geometry);
    }

    /**
     * Sets the starting angle position of the robot (if needed).
     * @param start The starting position as an array of numbers.
     */
    public setStartAngles(startAngles: number[]): void {
        this.startAngles = startAngles;
        this.reached = true;
    }

    /**
     * Sets the target pose for the robot to move to.
     * @param pose The target pose as an array of numbers.
     */
    public setPose(pose: number[]): void {
        this.reached = false;
        this.calculateMove(pose);
    }

    /**
     * Moves the robot one step closer to the target pose.
     * @returns The current position of the robot as an array of numbers.
     */
    public moveStep(): number[] {
        if (this.targetReached()) {
            return this.startAngles;
        }
        for (let i = 0; i < this.startAngles.length; i++) {
            this.startAngles[i] += this.stepper[i];
        }
        return this.startAngles;
    }

    /**
     * Calculates the move based on the given pose and step size.
     * @param pose - The pose array representing the target position.
     * @param stepSize - The step size for the movement. Default value is 100.
     */
    private calculateMove(pose: number[], stepSize = 100): void {
        this.targetAngles = this.robotKin.inverse(...pose);

        console.warn("Target Angles: ", this.targetAngles);
        console.warn("Start Angles: ", this.startAngles);

        if (this.targetAngles.includes(NaN)) {
            console.warn("No solution found!");
            this.reached = true;
            return;
        }

        for (let i = 0; i < this.startAngles.length; i++) {
            this.stepper.push((this.targetAngles[i] - this.startAngles[i]) / stepSize);
            //this.stepper.push(this.targetAngles[i] / stepSize)
        }
    }

    /**
     * Checks if the target angles have been reached within a specified epsilon.
     * @param eps The epsilon value to determine the acceptable difference between the start and target angles.
     * @returns A boolean indicating whether the target angles have been reached.
     */
    private targetReached(eps = 0.005): boolean {
        let reachDiff = 0;
        for (let i = 0; i < this.startAngles.length; i++) {
            reachDiff += Math.abs(this.startAngles[i] - this.targetAngles[i]);
        }
        reachDiff = reachDiff / this.startAngles.length;
        if (reachDiff < eps) {
            this.reached = true;
            this.startAngles = this.targetAngles;
            this.stepper = [];
        }
        return this.reached;
    }
}