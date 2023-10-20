#version 300 es

/**
 * This is a dummy vertex shader that takes in a vertex position attribute and applies
 * a model view matrix and a projection matrix to it to calculate the final position of the vertex.
 * 
 * @param aVertexPosition The position of the vertex in 3D space.
 * @param uModelViewMatrix The model view matrix used to transform the vertex position.
 * @param uProjectionMatrix The projection matrix used to project the vertex onto the screen.
 * 
 * @return The final position of the vertex after applying the model view and projection matrices.
 */
in vec3 aVertexPosition;
uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;

void main(void) {
  gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(aVertexPosition, 1.0);
}