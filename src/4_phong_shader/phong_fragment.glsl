#version 300 es

precision highp float;

// Uniforms für Lichtquelle
uniform vec4 uLightPosition;      // Position der Lichtquelle
uniform vec4 uLightAmbient;       // Umgebungslicht
uniform vec4 uLightDiffuse;       // Diffuses Licht
uniform vec4 uLightSpecular;      // Spiegelndes Licht

// Uniforms für Material
uniform vec4 uMaterialEmission;   // Emissive Beleuchtung des Materials
uniform vec4 uMaterialAmbient;    // Umgebungslicht des Materials
uniform vec4 uMaterialDiffuse;    // Diffuses Reflexionslicht des Materials
uniform vec4 uMaterialSpecular;   // Spiegelnde Reflexion des Materials
uniform float uMaterialShininess; // Glanz des Materials

// Eingabevariablen von Vertex-Shader
in vec3 vVertexPos;   // Position des Vertex im Kamerakoordinatensystem
in vec3 vNormalPos;    // Normale des Vertex im Kamerakoordinatensystem

// Ausgabevariable für Fragment-Shader
out vec4 outFragColor; // Ausgabefarbe des Fragments


uniform sampler2D uTexture; 
//in vec2 fTextureCoord;
in vec2 vTextureCoord;


void main(void) {
    // Normalisierte Normale des Fragments
    vec3 N = normalize(vNormalPos);

    // Emissive Beleuchtung des Materials
    vec4 emissiv = uMaterialEmission;

    // Ambient Lighting: Umgebungslicht beeinflusst das Material
    vec4 ambient = uLightAmbient * uMaterialAmbient;
     vec3 Z = vec3(0.0, 0.0, 1.0); // Richtung eines infiniten Augenpunktes (normalisiert)
    vec3 L = vec3(0.0);
    // Berechnung des einfallenden Lichtvektors (Diffuses Licht)
    L = normalize(vec3(uLightPosition) - uLightPosition.w * vVertexPos);
    
    // Diffuse Lighting: Licht, das direkt auf das Material fällt
    float diffuseIntensity = max(dot(N, L), 0.0);
   vec4 diffuse = (diffuseIntensity * uMaterialDiffuse * uLightDiffuse);

    // Berechnung des reflektierten Lichtvektors (Specular Light)
    vec3 R = reflect(-L, N);

    // Spekularlicht: Lichtreflexion auf dem Material
    vec4 specular = vec4(0.0, 0.0, 0.0, 1.0);
    float a = max(dot(N, L), 0.0);
    if (a > 0.0) {
       // float specLight = pow(max(dot(R, normalize(vec3(0.0, 0.0, 1.0))), 0.0), uMaterialShininess);
        float specLight = pow(max(dot(R, Z), 0.0), uMaterialShininess);
        specular = vec4(vec3(specLight), 1.0) * uMaterialSpecular * uLightSpecular;
         diffuse = (a * uMaterialDiffuse * uLightDiffuse * texture(uTexture, vTextureCoord));
    }



    // Summe aller Beleuchtungskomponenten für die Endfarbe
   outFragColor = texture(uTexture,vTextureCoord)*(emissiv + ambient + diffuse + specular);
    // outFragColor =  diffuse ;
   // outFragColor = specular;
   // outFragColor = ambient;
   // outFragColor = emissiv;
   //outFragColor = vec4(N,1.0);
   // outFragColor = 0.5 * (vec4(N, 1.0) + vec4(1.0, 1.0, 1.0, 1.0));
}
