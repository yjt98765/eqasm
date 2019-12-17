'use strict';

import * as path from 'path';
import * as os from 'os';

import { Trace } from 'vscode-jsonrpc';
import { commands, window, workspace, ExtensionContext, Uri } from 'vscode';
import { LanguageClient, LanguageClientOptions, ServerOptions } from 'vscode-languageclient';

export function activate(context: ExtensionContext) {
    // The server is a locally installed in src/org.pcl.eqasm.ide-1.0.0-SNAPSHOT
    let launcher = os.platform() === 'win32' ? 'org.pcl.eqasm.ide.bat' : 'org.pcl.eqasm.ide';
    let script = context.asAbsolutePath(path.join('src', 'org.pcl.eqasm.ide-1.0.0-SNAPSHOT', 'bin', launcher));

    let serverOptions: ServerOptions = {
        run: { command: script },
        debug: { command: script, args: [], options: { env: createDebugEnv() } }
    };

    let clientOptions: LanguageClientOptions = {
        documentSelector: ['eqasm'],
        synchronize: {
            fileEvents: workspace.createFileSystemWatcher('**/*.eqasm*')
        }
    };

    // Create the language client and start the client.
    let lc = new LanguageClient('Xtext Server', serverOptions, clientOptions);

    var disposable2 = commands.registerCommand("eqasm.a.proxy", async () => {
        let activeEditor = window.activeTextEditor;
        if (!activeEditor || !activeEditor.document || activeEditor.document.languageId !== 'eqasm') {
            return;
        }

        if (activeEditor.document.uri instanceof Uri) {
            commands.executeCommand("eqasm.a", activeEditor.document.uri.toString());
        }
    })
    context.subscriptions.push(disposable2);

    // enable tracing (.Off, .Messages, Verbose)
    lc.trace = Trace.Verbose;
    let disposable = lc.start();

    // Push the disposable to the context's subscriptions so that the
    // client can be deactivated on extension deactivation
    context.subscriptions.push(disposable);
}

function createDebugEnv() {
    return Object.assign({
        JAVA_OPTS: "-Xdebug -Xrunjdwp:server=y,transport=dt_socket,address=8000,suspend=n,quiet=y"
    }, process.env)
}