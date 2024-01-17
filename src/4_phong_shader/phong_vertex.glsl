#version 300 es

in vec3 aVertexPosition;
in vec3 aNormalPosition;
in vec2 aTextureCoord;

uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;
uniform mat3 uNormalMatrix;

out vec3 vVertexPos;
out vec3 vNormalPos;


out vec2 vTextureCoord;


void main(void) {
    gl_Position = uProjectionMatrix * uModelViewMatrix *vec4(aVertexPosition, 1);
    vec4 pos = uModelViewMatrix * vec4(aVertexPosition, 1);
    vVertexPos = pos.xyz / pos.w;
     vNormalPos = normalize(uNormalMatrix * aNormalPosition);
     
     vTextureCoord = aTextureCoord;
  
}
