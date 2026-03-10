import * as vscode from 'vscode';
import { GroqClient } from './groqClient';

export function activate(context: vscode.ExtensionContext) {
    // 1. Get API Key from VS Code Settings
    const config = vscode.workspace.getConfiguration('groq');
    const apiKey = config.get<string>('apiKey') || '';
    
    const client = new GroqClient(apiKey);

    // 2. Register the 'Explain' command
    let disposable = vscode.commands.registerCommand('groq-specialist.ask', async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) return;

        // Get the highlighted text
        const selection = editor.selection;
        const text = editor.document.getText(selection);

        if (!text) {
            vscode.window.showInformationMessage('Please highlight some code first!');
            return;
        }

        // Show a progress notification while streaming
        vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification,
            title: "Groq is thinking...",
            cancellable: false
        }, async (progress) => {
            let fullResponse = '';
            for await (const chunk of client.getStreamingCompletion(`Explain this code snippet:\n${text}`)) {
                fullResponse += chunk;
                // You could log progress here or update a webview
            }
            // Show result in a new document or message
            vscode.window.showInformationMessage('Explanation complete! Check the output.');
            console.log(fullResponse); 
        });
    });

    context.subscriptions.push(disposable);
}