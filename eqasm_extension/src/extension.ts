'use strict';

import * as path from 'path';
import * as os from 'os';

import { Trace } from 'vscode-jsonrpc';
import { workspace, ExtensionContext } from 'vscode';
import { LanguageClient, LanguageClientOptions, ServerOptions } from 'vscode-languageclient';

let client: LanguageClient;

export function activate(context: ExtensionContext) {
    // The server is a locally installed in src/org.pcl.eqasm.ide-1.0.0-SNAPSHOT
    let launcher = os.platform() === 'win32' ? 'org.pcl.eqasm.ide.bat' : 'org.pcl.eqasm.ide';
    let script = context.asAbsolutePath(path.join('src', 'org.pcl.eqasm.ide-1.0.0-SNAPSHOT', 'bin', launcher));

    let serverOptions: ServerOptions = {
        command: script
    };

    let clientOptions: LanguageClientOptions = {
        documentSelector: ['eqasm'],
        synchronize: {
            fileEvents: workspace.createFileSystemWatcher('**/*.eqasm*')
        }
    };

    // Create the language client and start the client.
    client = new LanguageClient('eqasmServer', 'eQASM Server', serverOptions, clientOptions);

    // enable tracing (.Off, .Messages, Verbose)
    client.trace = Trace.Verbose;
    client.start();
}

export function deactivate(): Thenable<void> | undefined {
	if (!client) {
		return undefined;
	}
	return client.stop();
}
