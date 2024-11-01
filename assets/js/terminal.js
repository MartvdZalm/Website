const terminalContainer = document.getElementById('terminal-container');
const powerButton = document.getElementById('power-button');

const fileSystem = {
    'C:': {
        'AUTOEXEC.BAT': 'This batch file runs at boot to configure the system environment.',
        'CONFIG.SYS': 'This file configures system settings and loads drivers.',
        'COMMAND.COM': 'The command interpreter for MS-DOS.',
        'IO.SYS': 'A hidden system file required by MS-DOS to boot.',
        'MSDOS.SYS': 'A hidden system file used by MS-DOS for booting.',
        'WIN.COM': 'The command to start Windows from MS-DOS (if Windows is installed).',
        'PROGRAMS': {
            'EXAMPLES.EXE': 'An example executable program.',
        },
        'windows': {
            'WIN.COM': 'Windows initialization file for settings and configuration.',
            'SYSTEM': {
                'KERNEL32.DLL': 'A crucial system file for Windows.',
                'USER.EXE': 'Executable file related to user interface functions.',
            },
            'PROGRAMS': {
                'NOTEPAD.EXE': 'The Notepad application for editing text.',
                'CALCULATOR.EXE': 'The Calculator application for performing calculations.',
            },
            'FONTS': {
                'ARIAL.TTF': 'TrueType font file for Arial.',
                'TIMES.TTF': 'TrueType font file for Times New Roman.',
            },
        },
    },
};


// SOUNDS
const windows95StartupSound = new Audio('assets/sounds/microsoft-windows-95-startup-sound.mp3');
// const typingSound = new Audio('assets/sounds/keyboard-sound.mp3');

let terminalOn = false;
let rootDir = 'C:\\';
let currentDir = 'C:\\';
let prompt = '>';

function initializeTerminal()
{
    if (terminalOn) {
        terminalContainer.innerHTML = '';
        addTerminalLine("IBM PC DOS 1.0");
        addTerminalLine("Copyright IBM Corp 1981");
        addTerminalLine("All rights reserved.");
        setTimeout(() => {
            addTerminalLine("Initializing...");
            setTimeout(() => {
                addTerminalLine("Type 'help' to see available commands.");
                createNewPromptLine();
            }, 2000);
        }, 1500);
    }
}

function showStartupImage()
{
    terminalContainer.innerHTML = '';
    const startupImage = document.createElement('img');
    startupImage.src = 'assets/images/ibm-startup-screen.png';
    startupImage.classList.add('startup-image');
    terminalContainer.appendChild(startupImage);
    startupImage.style.display = 'block';

    setTimeout(() => {
        startupImage.style.display = 'none';
        initializeTerminal();
    }, 5000);
}

powerButton.addEventListener('click', () => {
    if (!terminalOn) {
        terminalOn = true;
        setTimeout(() => {
            showStartupImage();
            terminalContainer.classList.remove('off');
        }, 2500);
    } else {
        terminalOn = false;
        terminalContainer.classList.add('off');
        terminalContainer.innerHTML = '';
    }
});

function createNewPromptLine()
{
    const promptLine = document.createElement('div');
    promptLine.classList.add('prompt-line');
    
    const promptSymbol = document.createElement('span');
    promptSymbol.textContent = `${currentDir}${prompt}`;
    promptLine.appendChild(promptSymbol);

    const inputSpan = document.createElement('span');
    inputSpan.classList.add('input');
    promptLine.appendChild(inputSpan);

    const cursor = document.createElement('span');
    cursor.classList.add('cursor');
    promptLine.appendChild(cursor);

    terminalContainer.appendChild(promptLine);
    terminalContainer.scrollTop = terminalContainer.scrollHeight;

    setUpTyping(inputSpan, cursor);
}

function setUpTyping(inputSpan, cursor)
{
    document.removeEventListener('keydown', handleKeydown);

    function handleKeydown(event) {
        event.preventDefault()

        if (event.key === 'Enter') {
            const command = inputSpan.textContent.trim();
            handleCommand(command);
            cursor.remove();
            document.removeEventListener('keydown', handleKeydown);
            createNewPromptLine();
        } else if (event.key === 'Backspace') {
            inputSpan.textContent = inputSpan.textContent.slice(0, -1);
        } else if (event.key.length === 1) {
            inputSpan.textContent += event.key;
        }
    }

    document.addEventListener('keydown', handleKeydown);
}

function addTerminalLine(text)
{
    const line = document.createElement('p');
    line.textContent = text;
    line.classList.add('terminal-text');
    terminalContainer.appendChild(line);
    terminalContainer.scrollTop = terminalContainer.scrollHeight;
}

function handleCommand(command)
{
    const [cmd, ...args] = command.trim().split(' ');

    switch (cmd.toLowerCase()) {
        case 'ls':
            listDirectory(args[0] || currentDir);
            break;
        case 'cd':
            if (args[0]) {
                changeDirectory(args[0]);
            } else {
                addTerminalLine("cd <directory>");
            }
            break;
        case 'help':
            addTerminalLine("Commands: ls, cat <file>, cd <directory>, help");
            break;
        case 'cls':
            terminalContainer.innerHTML = '';
            break;
        case 'config':
            loadPage('home.html');
            break;
        case 'run':
            runProgram(args[0]);
            break;
        default:
            addTerminalLine("Command not recognized. Type 'help' for available commands.");
            break;
    }
}

function listDirectory(path)
{
    const dir = getFileSystemPath(path);
    if (dir) {
        const items = Object.keys(dir);
        let output = '';

        items.forEach(item => {
            if (typeof dir[item] === 'object') {
                output += `${item}/\n`;
            } else {
                output += `${item}\n`;
            }
        });

        addTerminalLine(output.trim());
    } else {
        addTerminalLine('Directory not found.');
    }
}

function changeDirectory(path)
{
    if (path === '..') {
        const parts = currentDir.split('\\').filter(part => part);
        if (parts.length > 1) {
            parts.pop();
            currentDir = parts.join('\\') + '\\';
        } else {
            currentDir = rootDir;
        }
    } else if (path.startsWith('\\')) {
        currentDir = path.endsWith('\\') ? path : path;
    } else {
        const newDir = currentDir + path;
        if (getFileSystemPath(newDir)) {
            currentDir = newDir.endsWith('\\') ? newDir : newDir;
        } else {
            addTerminalLine('Directory not found.');
            return;
        }
    }
}

function getFileSystemPath(path)
{
    const parts = path.split('\\').filter(part => part);
    let dir = fileSystem;

    for (const part of parts) {
        if (dir[part]) {
            dir = dir[part];
        } else {
            return null;
        }
    }

    return dir;
}

function runProgram(program)
{
    const path = getFileSystemPath(`${currentDir}\\${program}`);

    if (path) {
        switch (program.toUpperCase()) {
            case 'WIN.COM':
                startWindows();
                break;
            case 'NOTEPAD.EXE':
                addTerminalLine('Starting Notepad...');
                break;
            case 'CALCULATOR.EXE':
                addTerminalLine('Starting Calculator...');
                break;
            default:
                addTerminalLine(`Running ${program}...`);
                break;
        }
    } else {
        addTerminalLine('Program not found.');
    }
}

function startWindows()
{
    addTerminalLine('Starting Windows 95...');

    setTimeout(() => {
        terminalContainer.innerHTML = '';
        const startupImage = document.createElement('img');
        startupImage.src = 'assets/images/microsoft-windows-95-startup-screen.jpg';
        startupImage.classList.add('startup-image');
        terminalContainer.appendChild(startupImage);
        startupImage.style.display = 'block';

        windows95StartupSound.play();
        
        setTimeout(() => {
            startupImage.style.display = 'none';
            loadPage('windows.html');
        }, 7000);

    }, 3000);
}

function loadPage(page)
{
    window.location.href = "pages/" + page;
    // fetch(`pages/${page}`)
    //     .then(response => {
    //         if (!response.ok) {
    //             throw new Error('Network response was not ok');
    //         }
    //         return response.text();
    //     })
    //     .then(html => {
    //         terminalContainer.innerHTML = html;

    //         const tempDiv = document.createElement('div');
    //         const scripts = tempDiv.querySelectorAll('script');
            
    //         scripts.forEach(script => {
    //             const newScript = document.createElement('script');
    //             if (script.src) {
    //                 newScript.src = script.src;
    //             } else {
    //                 newScript.textContent = script.textContent;
    //             }
    //             document.body.appendChild(newScript);
    //         });
    //     })
    //     .catch(error => {
    //         addTerminalLine('Error loading page: ' + error.message);
    //     });
}

initializeTerminal();