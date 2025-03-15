
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

	setup()
	{
		document.getElementById('power-button').addEventListener('click', () => {
			this.togglePower();
		});
	}

	start()
	{
		if (this.terminalOn) {
			this.container.innerHTML = '';
		    this.addTerminalLine("IBM PC DOS 1.0");
            this.addTerminalLine("Copyright IBM Corp 1981");
            this.addTerminalLine("All rights reserved.");
            setTimeout(() => {
                this.addTerminalLine("Initializing...");
                setTimeout(() => {
                    this.addTerminalLine("Type 'help' to see available commands.");
                    this.createNewPromptLine();
                }, 2000);
            }, 1500);
		}
	}

	togglePower()
	{
		if (!this.terminalOn) {
			this.terminalOn = true;
			setTimeout(() => {
				this.showStartup();
				this.container.classList.remove('off');
			}, 2500);
		} else {
			this.terminalOn = false;
			this.container.classList.add('off');
			this.container.innerHTML = '';
		}
	}

    showStartup()
    {
    	const startupImage = document.createElement('img');

        this.container.innerHTML = '';
        startupImage.src = 'assets/images/ibm-startup-screen.png';
        startupImage.classList.add('startup-image');
        this.container.appendChild(startupImage);
        startupImage.style.display = 'block';

        setTimeout(() => {
            startupImage.style.display = 'none';
            this.start();
        }, 5000);
    }

    addTerminalLine(text)
    {
        const line = document.createElement('p');
        line.textContent = text;
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

    handleCommand(command)
    {
        const [cmd, ...args] = command.trim().split(' ');

        switch (cmd.toLowerCase()) {
            case 'dir':
                FileSystem.listDirectory(args[0] || this.currentDir);
                break;
            // case 'cd':
            //     if (args[0]) {
            //         this.changeDirectory(args[0]);
            //     } else {
            //         this.addTerminalLine("cd <directory>");
            //     }
            //     break;
            // case 'help':
            //     this.addTerminalLine("Commands: ls, cat <file>, cd <directory>, help");
            //     break;
            // case 'cls':
            //     this.terminalContainer.innerHTML = '';
            //     break;
            // case 'config':
            //     this.loadPage('home.html');
            //     break;
            // case 'run':
            //     this.runProgram(args[0]);
            //     break;
            // default:
            //     this.addTerminalLine("Command not recognized. Type 'help' for available commands.");
            //     break;
        }       
    }
}
