'use strict';
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as os from 'os';

const date = () => {
    const now = new Date();
    return [now.getFullYear(), now.getMonth() + 1, now.getDate()].map(d => d.toString().length > 1 ? d : `0${d}`).join('');
};

const expandHomeDir = (path: string): string => {
    return path.replace(/^~/, os.homedir);
}

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('daily-memo.open', async () => {
        const config = vscode.workspace.getConfiguration('daily-memo');
        const dir = config.get('directory');
        const path = expandHomeDir(`${dir}/${date()}.md`);
        if (!fs.existsSync(path)) {
            fs.closeSync(fs.openSync(path, 'w+'));
        }
        const doc = await vscode.workspace.openTextDocument(path);
        vscode.window.showTextDocument(doc, -1, true);
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {
}