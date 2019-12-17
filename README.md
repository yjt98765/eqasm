# How to build eQASM VS Code Extension

See the [extension introduction](eqasm_extension/README.md) for basic information regarding the eQASM extension. This file briefly introduces the processes for building this extension from source code.

## Implementation
The services provided by this extension mainly come from two components, i.e., a language server and a syntax highlighting file. 
- The language server provides [IntelliSense](https://code.visualstudio.com/docs/editor/intellisense) features such as syntax error detect and definition navigation. In this extension, the language server is implemented using [XText](https://www.eclipse.org/Xtext/). The source code is in [eqasm_languageserver](eqasm_languageserver/) folder. 
- The syntax highlighting file ([mydsl.tmLanguage.json](eqasm_extension/mydsl.tmLanguage.json)) is manually written following [TextMate](https://macromates.com/manual/en/language_grammars) grammar.

## Build
To build this extension, you need to first build the language server and then compile the extension.

### Build language server
- Prerequisite: [Java Development Kit (JDK)](https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html), [Eclipse (DSL package)](https://www.eclipse.org/downloads/packages/release/2019-09/r/eclipse-ide-java-and-dsl-developers), and [Gradle](https://gradle.org/).
- Run the following commands
```
cd eqasm_languageserver\org.pcl.eqasm.parent
gradlew build
```
The building process may take a few minutes.

### Copy language server to extension folder
- Expand the compressed file (either org.pcl.eqasm.ide-1.0.0-SNAPSHOT.tar or org.pcl.eqasm.ide-1.0.0-SNAPSHOT.zip) in `eqasm_languageserver\org.pcl.eqasm.parent\org.pcl.eqasm.ide\build\distributions\` folder to `eqasm_extension\src\`

### Build extension
- Prerequisite: [node](https://nodejs.org/) and [yarn](https://yarnpkg.com/)
- Run the following commands
```
cd eqasm_extension
yarn install
```
The building process can typically be done within a minute. `node_modules` and `out` folders will be generated

## Debug
You can debug the extension with VS Code using the following commands:
```
cd eqasm_extension
code .
```
Press `F5` or select `Debug -> Start debugging` in the menu, a new VS Code window will pop up. This window works as if the extension has already been installed.

## Package
The `eqasm_extension\` folder can be packaged into a `.vsix` file using the following commands:
```
cd eqasm_extension
vsce package
```
[`vsce`](https://github.com/microsoft/vscode-vsce) can be installed with `npm install -g vsce`.

## Useful links
- [VS Code extension API](https://code.visualstudio.com/api)
- An [introduction](https://www.apeth.com/nonblog/stories/textmatebundle.html) on TextMate grammar