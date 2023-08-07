import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('Execute Wizard Command', async () => {
		
		await vscode.extensions.getExtension('kendo-project-wizard')!.activate();
	
		await vscode.commands.executeCommand('kendo-project-wizard.helloWorld');
	
		await vscode.window.withProgress(
		  { location: vscode.ProgressLocation.Notification, title: 'Waiting for Webview...' },
		  () => {
			return new Promise((resolve) => setTimeout(resolve, 1000)); // Adjust the wait time if needed
		  }
		);
	
		// Get the webview panel
		const panel = vscode.window.visibleTextEditors.find(
			(editor) => editor.document.uri.scheme === 'webview'
		  );

		assert.ok(panel, 'Webview panel should be open.');

	  });
});