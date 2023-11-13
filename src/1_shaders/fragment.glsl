#version 300 es

// This is a dummy fragment shader that sets the output color to white.
// Fragment shaders don't have a default precision so we need to pick one. 
// highp is a good default. It means "high precision"
precision highp float;

out vec4 outFragColor;
in vec3 vertexColor;

void main(void) {

    outFragColor = vec4(vertexColor,1.0f);

}
