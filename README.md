## Benötigte Ausstattung
- **TypeScript**[^1] und **glMatrix**[^2] über Node.js
- **Texteditor** oder **IDE** wie VSCode, Vim oder Notepad++
- **Internetbrowser** mit **WebGL 2.0** wie z.B. [Firefox](https://www.mozilla.org/de/firefox/new/)
  - Check: [https://get.webgl.org/webgl2/](https://get.webgl.org/webgl2/) :heavy_check_mark:
- **Git** für den Zugriff auf Praktikumsmaterialien
- optional Docker -> Beschreibung Todo (Remote Container Erweiterung in vscode)

## Vorbereitungen

- **Node.js v20.8.1** und **npm v10.1.0** [installieren](https://nodejs.org/en/download/).
- **Git** [installieren](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git). 
- Für die Implementierung der Praktikumsaufgaben nutzen Sie eine geeignete **IDE** oder einen **Texteditor** wie z.B. VSCode: [Installation](https://code.visualstudio.com/download).  
   VSCode beinhaltet eine integrierte Konsole und unterstützt nativ TypeScript. Empfohlen werden zudem die Erweiterungen 
   -  zur Editierung von WebGL GLSL Shader-Programmen z.B. **WebGL GLSL Editor Plugin**
   -  **ESLint** zur Syntax-Validierung von TypeScript  

## Installieren von Nodejs v20 auf den IGL-Lab Rechnern
Nutzen Sie `curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.32.1/install.sh | bash` um auf den IGL-Rechnern für den aktuellen `User` nvm zu installieren. Verwenden Sie anschließend den Befehl `nvm install 20` um für Ihren `User` Node.js 20 zu installieren.

## Starten des Beispielprogramms
Nachfolgende Befehle müssen in der Konsole ausgeführt werden.

1. Klonen Sie das Git-Repository mit dem Befehl: 
`git clone https://git.fh-muenster.de/vclab/cg/cg-wise23.git`
2. Gehen Sie in den geklonten Ordner mit: `cd cg-wise23`
3. Installation der Projektabhängigkeiten: `npm install`
4. Anschließend können Sie einen Server am Port 9000 starten mit dem Befehl: `npm start`
5. Öffnen Sie die Webseite auf ***localhost:9000*** in Ihrem Webbrowser.





## Referenzen
[^1]: [TypeScript](https://www.typescriptlang.org/) bietet u.a. JavaScript Programmierung mit Typen  
[^2]: [glMatrix](https://glmatrix.net/) ist eine Bibliothek für Matrix- und Vektor-Rechnung geschrieben in JavaScript

