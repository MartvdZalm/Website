
class Terminal
{
	constructor()
	{
		this.container = document.getElementById('ibm__frame__terminal');		
		this.windows95StartupSound = new Audio('assets/sounds/microsoft-windows-95-startup-sound.mp3');
		this.terminalOn = false;
        this.currentDir = 'C:';
		this.prompt = '>';

		this.setup();
	}

    async setup() {
        const params = new URLSearchParams(window.location.search);
    
        if (params.get("restart") === "yes") {
            await this.togglePower();
            this.startWindows();
        }

        if (params.get("msdos") === "yes") {
            this.terminalOn = true;
            this.container.classList.remove('off');
            this.start();
        }
    
        document.getElementById('power-button').addEventListener('click', async () => {
            await this.togglePower();
        });
    }
    

    togglePower()
    {
        return new Promise(async (resolve) => {
            if (!this.terminalOn) {
                this.terminalOn = true;
                setTimeout(async () => {
                    this.container.classList.remove('off');
                    await this.showStartup();
                    resolve();
                }, 2000);
            } else {
                this.terminalOn = false;
                this.container.classList.add('off');
                this.container.innerHTML = '';
                resolve();
            }
        });
    }    

    showStartup()
    {
        return new Promise((resolve) => {
            const startupImage = document.createElement('img');
    
            this.container.innerHTML = '';
            startupImage.src = 'assets/images/ibm-startup-screen.png';
            startupImage.classList.add('startup-image');
            this.container.appendChild(startupImage);
            startupImage.style.display = 'block';
    
            setTimeout(() => {
                startupImage.style.display = 'none';
                this.start().then(resolve);
            }, 5000);
        });
    }
    
    start()
    {
        return new Promise((resolve) => {
            if (this.terminalOn) {
                this.container.innerHTML = '';
                // this.addTerminalLine("IBM PC DOS 1.0");
                // this.addTerminalLine("Copyright IBM Corp 1981");
                // this.addTerminalLine("All rights reserved.");
                this.addTerminalLine("Microsoft(R) MS-DOS 7.0");
                this.addTerminalLine("Copyright (C) Microsoft Corp 1981-1996.");
    
                setTimeout(() => {
                    this.addTerminalLine("Type 'help' to see available commands.");
                    this.createNewPromptLine();
                    resolve();
                }, 2000);
            }
        });
    }

    addTerminalLine(text)
    {
        const line = document.createElement('p');
        line.innerHTML = text.replace(/\n/g, '<br>');
        line.classList.add('terminal__text');
        this.container.appendChild(line);
        this.container.scrollTop = this.container.scrollHeight;
    }

    createNewPromptLine()
    {
        const promptLine = document.createElement('div');
        promptLine.classList.add('prompt__line');
        
        const promptSymbol = document.createElement('span');
        promptSymbol.textContent = `${this.currentDir}${this.prompt}`;
        promptLine.appendChild(promptSymbol);

        const inputSpan = document.createElement('span');
        inputSpan.classList.add('terminal__user__input');
        promptLine.appendChild(inputSpan);

        const cursor = document.createElement('span');
        cursor.classList.add('cursor');
        promptLine.appendChild(cursor);

        this.container.appendChild(promptLine);
        this.container.scrollTop = this.container.scrollHeight;

        this.setUpTyping(inputSpan, cursor);
    }

    setUpTyping(inputSpan, cursor)
    {
        document.removeEventListener('keydown', this.handleKeydown);

        this.handleKeydown = (event) => {
            event.preventDefault();

            if (event.key === 'Enter') {
                const command = inputSpan.textContent.trim();
                this.handleCommand(command);
                cursor.remove();
                document.removeEventListener('keydown', this.handleKeydown);
                this.createNewPromptLine();
            } else if (event.key === 'Backspace') {
                inputSpan.textContent = inputSpan.textContent.slice(0, -1);
            } else if (event.key.length === 1) {
                inputSpan.textContent += event.key;
            }
        };

        document.addEventListener('keydown', this.handleKeydown);
    }

    changeDirectory(path)
    {
        if (path === '..') {
            const parentDir = this.currentDir.substring(0, this.currentDir.lastIndexOf('/'));
            return parentDir || 'C:';
        }
    
        const newFolder = FileSystem.getFolderFromPath(this.currentDir + '/' + path);
    
        if (newFolder instanceof Folder) {
            return this.currentDir + '/' + path;
        }
        
        return null;
    }

    handleCommand(command)
    {
        const [cmd, ...args] = command.trim().split(' ');

        switch (cmd.toLowerCase()) {
            case 'dir':
                this.addTerminalLine(FileSystem.getFolderFromPath(args[0] || this.currentDir).displayContents());
                break;
            case 'cd':
                if (args[0]) {
                    const newDir = this.changeDirectory(args[0]);
                    if (newDir) {
                        this.currentDir = newDir;
                        this.addTerminalLine(`Changed directory to ${this.currentDir}`);
                    } else {
                        this.addTerminalLine(`Directory not found: ${args[0]}`);
                    }
                } else {
                    this.addTerminalLine(`Current directory: ${this.currentDir}`);
                }
                break;
            case 'cls':
                this.container.innerHTML = '';
                break;
            case 'win':
                this.startWindows();
                break;
            default:
                this.addTerminalLine("Command not recognized. Type 'help' for available commands.");
                break;
        }       
    }

    startWindows() {
        this.addTerminalLine('Starting Windows 95...');
        
        setTimeout(() => {
            this.container.innerHTML = '';
            const startupImage = document.createElement('img');
            startupImage.src = 'assets/images/microsoft-windows-95-startup-screen.jpg';
            startupImage.classList.add('startup-image');
            this.container.appendChild(startupImage);
            startupImage.style.display = 'block';

            this.windows95StartupSound.play();
            
            setTimeout(() => {
                startupImage.style.display = 'none';
                window.location.href = "index.html";
            }, 7000);
        }, 3000);
    }
}
