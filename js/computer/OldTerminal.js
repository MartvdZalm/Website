// class Terminal
// {
//     constructor(containerId, powerButtonId)
//     {
//         this.terminalContainer = document.getElementById(containerId);
//         this.powerButton = document.getElementById(powerButtonId);
//         this.fileSystem = new FileSystem();
//         this.windows95StartupSound = new Audio('assets/sounds/microsoft-windows-95-startup-sound.mp3');
//         this.terminalOn = false;
//         this.rootDir = 'C:\\';
//         this.currentDir = 'C:\\';
//         this.prompt = '>';

//         this.initialize();
//     }

//     initialize()
//     {
//         this.powerButton.addEventListener('click', () => this.togglePower());
//         this.initializeTerminal();
//     }

//     togglePower()
//     {
//         if (!this.terminalOn) {
//             this.terminalOn = true;
//             setTimeout(() => {
//                 this.showStartupImage();
//                 this.terminalContainer.classList.remove('off');
//             }, 2500);
//         } else {
//             this.terminalOn = false;
//             this.terminalContainer.classList.add('off');
//             this.terminalContainer.innerHTML = '';
//         }
//     }

//     initializeTerminal() {
//         if (this.terminalOn) {
//             this.terminalContainer.innerHTML = '';
//             this.addTerminalLine("IBM PC DOS 1.0");
//             this.addTerminalLine("Copyright IBM Corp 1981");
//             this.addTerminalLine("All rights reserved.");
//             setTimeout(() => {
//                 this.addTerminalLine("Initializing...");
//                 setTimeout(() => {
//                     this.addTerminalLine("Type 'help' to see available commands.");
//                     this.createNewPromptLine();
//                 }, 2000);
//             }, 1500);
//         }
//     }

//     showStartupImage() {
//         this.terminalContainer.innerHTML = '';
//         const startupImage = document.createElement('img');
//         startupImage.src = 'assets/images/ibm-startup-screen.png';
//         startupImage.classList.add('startup-image');
//         this.terminalContainer.appendChild(startupImage);
//         startupImage.style.display = 'block';

//         setTimeout(() => {
//             startupImage.style.display = 'none';
//             this.initializeTerminal();
//         }, 5000);
//     }

//     createNewPromptLine() {
//         const promptLine = document.createElement('div');
//         promptLine.classList.add('prompt__line');
        
//         const promptSymbol = document.createElement('span');
//         promptSymbol.textContent = `${this.currentDir}${this.prompt}`;
//         promptLine.appendChild(promptSymbol);

//         const inputSpan = document.createElement('span');
//         inputSpan.classList.add('terminal__user__input');
//         promptLine.appendChild(inputSpan);

//         const cursor = document.createElement('span');
//         cursor.classList.add('cursor');
//         promptLine.appendChild(cursor);

//         this.terminalContainer.appendChild(promptLine);
//         this.terminalContainer.scrollTop = this.terminalContainer.scrollHeight;

//         this.setUpTyping(inputSpan, cursor);
//     }

//     setUpTyping(inputSpan, cursor) {
//         document.removeEventListener('keydown', this.handleKeydown);

//         this.handleKeydown = (event) => {
//             event.preventDefault();

//             if (event.key === 'Enter') {
//                 const command = inputSpan.textContent.trim();
//                 this.handleCommand(command);
//                 cursor.remove();
//                 document.removeEventListener('keydown', this.handleKeydown);
//                 this.createNewPromptLine();
//             } else if (event.key === 'Backspace') {
//                 inputSpan.textContent = inputSpan.textContent.slice(0, -1);
//             } else if (event.key.length === 1) {
//                 inputSpan.textContent += event.key;
//             }
//         };

//         document.addEventListener('keydown', this.handleKeydown);
//     }

//     addTerminalLine(text) {
//         const line = document.createElement('p');
//         line.textContent = text;
//         line.classList.add('terminal__text');
//         this.terminalContainer.appendChild(line);
//         this.terminalContainer.scrollTop = this.terminalContainer.scrollHeight;
//     }

//     handleCommand(command) {
//         const [cmd, ...args] = command.trim().split(' ');

//         switch (cmd.toLowerCase()) {
//             case 'dir':
//                 this.listDirectory(args[0] || this.currentDir);
//                 break;
//             case 'cd':
//                 if (args[0]) {
//                     this.changeDirectory(args[0]);
//                 } else {
//                     this.addTerminalLine("cd <directory>");
//                 }
//                 break;
//             case 'help':
//                 this.addTerminalLine("Commands: ls, cat <file>, cd <directory>, help");
//                 break;
//             case 'cls':
//                 this.terminalContainer.innerHTML = '';
//                 break;
//             case 'config':
//                 this.loadPage('home.html');
//                 break;
//             case 'run':
//                 this.runProgram(args[0]);
//                 break;
//             default:
//                 this.addTerminalLine("Command not recognized. Type 'help' for available commands.");
//                 break;
//         }
//     }

//     listDirectory(path) {
//         const dir = this.fileSystem.getFileSystemPath(path);
//         if (dir) {
//             const items = Object.keys(dir);
//             let output = '';

//             items.forEach(item => {
//                 if (typeof dir[item] === 'object') {
//                     output += `${item}/\n`;
//                 } else {
//                     output += `${item}\n`;
//                 }
//             });

//             this.addTerminalLine(output.trim());
//         } else {
//             this.addTerminalLine('Directory not found.');
//         }
//     }

//     changeDirectory(path) {
//         if (path === '..') {
//             const parts = this.currentDir.split('\\').filter(part => part);
//             if (parts.length > 1) {
//                 parts.pop();
//                 this.currentDir = parts.join('\\') + '\\';
//             } else {
//                 this.currentDir = this.rootDir;
//             }
//         } else if (path.startsWith('\\')) {
//             this.currentDir = path.endsWith('\\') ? path : path;
//         } else {
//             const newDir = this.currentDir + path;
//             if (this.fileSystem.getFileSystemPath(newDir)) {
//                 this.currentDir = newDir.endsWith('\\') ? newDir : newDir;
//             } else {
//                 this.addTerminalLine('Directory not found.');
//                 return;
//             }
//         }
//     }

//     runProgram(program) {
//         const path = this.fileSystem.getFileSystemPath(`${this.currentDir}\\${program}`);

//         if (path) {
//             switch (program.toUpperCase()) {
//                 case 'WIN.COM':
//                     this.startWindows();
//                     break;
//                 case 'NOTEPAD.EXE':
//                     this.addTerminalLine('Starting Notepad...');
//                     break;
//                 case 'CALCULATOR.EXE':
//                     this.addTerminalLine('Starting Calculator...');
//                     break;
//                 default:
//                     this.addTerminalLine(`Running ${program}...`);
//                     break;
//             }
//         } else {
//             this.addTerminalLine('Program not found.');
//         }
//     }

//     startWindows() {
//         this.addTerminalLine('Starting Windows 95...');

//         setTimeout(() => {
//             this.terminalContainer.innerHTML = '';
//             const startupImage = document.createElement('img');
//             startupImage.src = 'assets/images/microsoft-windows-95-startup-screen.jpg';
//             startupImage.classList.add('startup-image');
//             this.terminalContainer.appendChild(startupImage);
//             startupImage.style.display = 'block';

//             this.windows95StartupSound.play();
            
//             setTimeout(() => {
//                 startupImage.style.display = 'none';
//                 this.loadPage('index.html');
//             }, 7000);

//         }, 3000);
//     }

//     loadPage(page) {
//         window.location.href = page;
//     }
// }

