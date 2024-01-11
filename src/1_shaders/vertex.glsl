#version 300 es

/**
 * Im Vertex Shader wird pro Vertex gearbeitet.
 * In der Vertex Machine wird vertexweise gearbeitet.
 * Vertex = Eckpunkt einer Form, z.B. hat ein Würfel 8 Vertices.
 * Koordinaten für Vertices sind Werte zwischen -1.0 und 1.0.
 * 
 * Ändern Sie die Farbe des Dreiecks im Fragment-Shader, indem Sie die Vertex-Koordinaten als Farbwerte interpretieren.
 * Wie lassen sich die Pixel-Farbwerte im Fragment-Shader aus den Vertex-Koordinaten im Vertex-Shader ermitteln?
 * Wie behandeln Sie Koordinaten, die außerhalb des Farbbereiches liegen?
 */

/**
 * This is a dummy vertex shader that takes in a vertex position attribute and applies
 * a model view matrix and a projection matrix to it to calculate the final position of the vertex.
 * 
 * @param aVertexPosition The position of the vertex in 3D space.
 * @param uModelViewMatrix The model view matrix used to transform the vertex position.
 * @param uProjectionMatrix The projection matrix used to project the vertex onto the screen.
 * @param uRotationMatrix The rotation matrix used to rotate the vertex.
 * 
 * @return The final position of the vertex after applying the model view and projection matrices.
 */
in vec3 aVertexPosition;
uniform mat4 uModelViewMatrix; // used for rotation, translation and scaling (not implmented)
uniform mat4 uProjectionMatrix;
out vec4 positionAsColor;

void main(void) {
  positionAsColor = vec4(aVertexPosition, 1.f);
  gl_Position = uProjectionMatrix * uModelViewMatrix * positionAsColor;

  // Wenn die Koordinaten außerhalb des Farbbereiches sind:
  // Verschiebe alle im Intervall [-1.0, 0.0) um 1
   
      positionAsColor.x = ((1.f/0.5f)*(positionAsColor.x)+1.f)*0.5f;
      positionAsColor.y = ((1.f/0.5f)*(positionAsColor.y)+1.f)*0.5f;
      positionAsColor.z = ((1.f/0.5f)*(positionAsColor.z)+1.f)*0.5f;
}