const vscode = acquireVsCodeApi();
const form = document.getElementById('wizardForm');
const submitBtn = document.getElementById('submitBtn');

submitBtn.addEventListener('click', () => {

  const projectName = document.getElementById('projectName').value;
  const projectType = document.getElementById('projectType').value;

  vscode.postMessage({ command: 'createProject', projectName, projectType });
  document.getElementById('projectType').value = vscode.postMessage;
}); 