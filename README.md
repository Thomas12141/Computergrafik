## Benötigte Ausstattung
- **TypeScript** über Node.js
- **Texteditor** oder **IDE** wie VSCode, Vim oder Notepad++
- **Internetbrowser** mit **WebGL 2.0** wie z.B. [Firefox](https://www.mozilla.org/de/firefox/new/)
  - Check: [https://get.webgl.org/webgl2/](https://get.webgl.org/webgl2/) :heavy_check_mark:
- **Git** für den Zugriff auf Praktikumsmaterialien

## Vorbereitungen

- **TypeScript**[^1] installieren:
    1. **Node.js** und **npm** [installieren](https://nodejs.org/en/download/). (Bei Problemen mit OpenSSL installieren Sie [Node.js 16](https://nodejs.org/download/release/v16.18.0/))
    2. Globale Installation von **TypeScript** in der Konsole mit: `npm install typescript -g`
- **Git** [installieren](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git). 
- Für die Implementierung der Praktikumsaufgaben nutzen Sie eine geeignete **IDE** oder einen **Texteditor** wie z.B. VSCode: [ Installation](https://code.visualstudio.com/download).  
   VSCode beinhaltet eine integrierte Konsole und unterstützt nativ TypeScript. Des weiteren bietet es unter anderem eine Erweiterung zur Editierung von Shader-Programmen:  
        - WebGL GLSL Editor Plugin  


## "Bauen" des Beispielprogramms
Nachfolgende Befehle müssen in der Konsole ausgeführt werden.

1. Klonen Sie das Git-Repository mit dem Befehl: 
`git clone https://git.fh-muenster.de/vclab/cg/cg-wise22.git`
2. Gehen Sie in den geklonten Ordner mit: `cd cg-wise22`
3. Installation der Projektabhängigkeiten:`npm install`
4. Damit *glMatrix*[^2] funktioniert, müssen Sie einige Pakete aktualisieren mit: `npm update`
5. Danach installieren Sie *glMatrix* mit: `npm install gl-matrix`
6. Anschließend können Sie einen Server am Port 9000 starten mit dem Befehl: `npm start`
7. Öffnen Sie die Webseite auf ***localhost:9000*** in Ihrem Webbrowser vorzugsweise

## Referenzen
[^1]: [TypeScript](https://www.typescriptlang.org/) bietet u.a. JavaScript Programmierung mit Typen 
[^2]: [glMatrix](https://glmatrix.net/) ist eine Bibliothek für Matrix- und Vektor-Rechnung geschrieben in JavaScript

