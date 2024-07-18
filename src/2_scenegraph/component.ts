import { SGNode } from "./sgnode";

/**
 * Represents an abstract component in the scene graph.
 * @extends SGNode
 */
export abstract class Component extends SGNode {
    private name: string;

    /**
     * Creates a new instance of Component.
     * @param name - The name of the component.
     */
    constructor(name: string) {
        super();
        this.name = name;
    }

    /**
     * Gets the name of the component.
     * @returns The name of the component.
     */
    public getName(): string {
        return this.name;
    }

    /**
     * Sets the name of the component.
     * @param name - The new name of the component.
     */
    public setName(name: string): void {
        this.name = name;
    }

    /**
     * Updates the component.
     * @param deltaTime - The time elapsed since the last update.
     */
    public update(deltaTime: number): void {
        console.log(`Updating component ${this.name} with deltaTime ${deltaTime}`);
    }

    /**
     * Destroys the component.
     */
    public destroy(): void {
        console.log(`Destroying component ${this.name}`);
    }

    public toString(): string {
        return this.name;
    }

    /**
     * Draws this component.
     */
    draw(time : number): void {
        // console.log("Drawing the component" + this.toString());
    }
}
