#version 300 es

// fragment shaders don't have a default precision so we need
// to pick one. highp is a good default. It means "high precision"
precision highp float;

// Dummy fragment shader 
out vec4 outFragColor;

void main(void) {
    outFragColor = vec4(1.f);
}
