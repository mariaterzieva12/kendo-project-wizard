// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import * as child from 'child_process';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "kendo-project-wizard" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('kendo-project-wizard.helloWorld', (uri: vscode.Uri) => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user

		const panel = vscode.window.createWebviewPanel(
			'kendoWizard', 
			'Create New Project Wizard', 
			vscode.ViewColumn.Active, 
			{
				enableScripts: true, 
				retainContextWhenHidden: true, 
			}
			);
		
			const htmlFilePath = path.join(context.extensionPath, 'src', 'webview', 'wizard.html');

			// Read the HTML file and set it as the webview content
			fs.readFile(htmlFilePath, 'utf-8', (err, htmlContent) => {
				if (err) {
					console.error('Error reading HTML file:', err);
				} else {
					panel.webview.html = htmlContent;
				}
			});

			panel.webview.onDidReceiveMessage((message) => {
			if (message.command === 'createProject') {
				const { projectName, projectType } = message;
				createProject(uri.fsPath, projectName, projectType);
			}
			});
		}
	);

	context.subscriptions.push(disposable);	
}

function createProject(directory: string, projectName: string, projectType: string) {
	switch (projectType){
		case "react": {
			child.exec(`cd ${directory} && npx create-react-app ${projectName}`, (error, stdout, stderr) => {
				if (error) {
					vscode.window.showErrorMessage(stderr);
				return;
				}
				if (stdout.length > 0){
					vscode.window.showInformationMessage(stdout);
				}
				if (stderr.length > 0){
					vscode.window.showErrorMessage(stderr);
				}
			});
			break; 
		}
		case "angular": {
			child.exec(`cd ${directory} && ng new ${projectName}`, (error, stdout, stderr) => {
				if (error) {
					vscode.window.showErrorMessage(stderr);
				return;
				}
				if (stdout.length > 0){
					vscode.window.showInformationMessage(stdout);
				}
				if (stderr.length > 0){
					vscode.window.showErrorMessage(stderr);
				}
			});
			break; 
		}
		case "vue": {
			child.exec(`cd ${directory} && vue create ${projectName} -d`, (error, stdout, stderr) => {
				if (error) {
					vscode.window.showErrorMessage(stderr);
				return;
				}
				if (stdout.length > 0){
					vscode.window.showInformationMessage(stdout);
				}
				if (stderr.length > 0){
					vscode.window.showErrorMessage(stderr);
				}
			});
			break; 
		}
		default: {
			vscode.window.showErrorMessage("Invalid project type");
		}
	}

}

// This method is called when your extension is deactivated
export function deactivate() {}
