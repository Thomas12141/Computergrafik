#version 300 es

/**
 * Im Fragment Shader wird pro Pixel gearbeitet.
 * Sobald er zum Einsatz kommt, wird pixelweise gearbeitet.
 * Farben für Pixel sind Werte zwischen 0.0 und 1.0.
 */

// This is a dummy fragment shader that sets the output color to white.
// Fragment shaders don't have a default precision so we need to pick one. 
// highp is a good default. It means "high precision"
precision highp float;

in vec4 positionAsColor; // x, y und z als Farben mit 1.0 als Transparenz-Wert
out vec4 outFragColor; // Ausgabefarbe

void main(void) {
    outFragColor = vec4(positionAsColor.x, positionAsColor.y, positionAsColor.z, positionAsColor.a);
}
