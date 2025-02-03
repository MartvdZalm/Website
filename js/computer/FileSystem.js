class FileSystem {
    constructor() {
        this.fileSystem = {
            'C:': {
                'AUTOEXEC.BAT': 'This batch file runs at boot to configure the system environment.',
                'CONFIG.SYS': 'This file configures system settings and loads drivers.',
                'COMMAND.COM': 'The command interpreter for MS-DOS.',
                'IO.SYS': 'A hidden system file required by MS-DOS to boot.',
                'MSDOS.SYS': 'A hidden system file used by MS-DOS for booting.',
                'WIN.COM': 'The command to start Windows from MS-DOS (if Windows is installed).',
                'DOS': {
                    'EDIT.COM': 'The MS-DOS text editor.',
                    'FORMAT.COM': 'Utility to format disks.',
                    'FDISK.EXE': 'Utility to partition hard drives.',
                    'XCOPY.EXE': 'Utility to copy files and directories.',
                    'MORE.COM': 'Utility to display text one screen at a time.',
                },
                'WINDOWS': {
                    'WIN.COM': 'The executable to start Windows 95.',
                    'SYSTEM': {
                        'KERNEL32.DLL': 'A crucial system file for Windows.',
                        'USER.EXE': 'Executable file related to user interface functions.',
                        'GDI.EXE': 'Graphics Device Interface executable for handling graphics.',
                        'SHELL32.DLL': 'Provides Windows shell functionality.',
                        'WIN.INI': 'Configuration file for Windows settings.',
                        'SYSTEM.INI': 'Configuration file for system settings.',
                    },
                    'PROGRAMS': {
                        'NOTEPAD.EXE': 'The Notepad application for editing text.',
                        'CALC.EXE': 'The Calculator application for performing calculations.',
                        'WRITE.EXE': 'The Windows Write word processor.',
                        'PAINT.EXE': 'The Paint application for drawing.',
                        'SOL.EXE': 'The Solitaire game.',
                        'WINMINE.EXE': 'The Minesweeper game.',
                    },
                    'FONTS': {
                        'ARIAL.TTF': 'TrueType font file for Arial.',
                        'TIMES.TTF': 'TrueType font file for Times New Roman.',
                        'COUR.TTF': 'TrueType font file for Courier New.',
                    },
                    'TEMP': {
                        'TEMP_FILE.TMP': 'A temporary file.',
                    },
                },
                'PROGRAMS': {
                    'EXAMPLES.EXE': 'An example executable program.',
                },
                'MYDOCU~1': {
                    'README.TXT': 'A sample text file in the "My Documents" folder.',
                },
            },
        };
    }

    getFileSystemPath(path) {
        const parts = path.split('\\').filter(part => part);
        let dir = this.fileSystem;

        for (const part of parts) {
            if (dir[part]) {
                dir = dir[part];
            } else {
                return null;
            }
        }

        return dir;
    }
}
