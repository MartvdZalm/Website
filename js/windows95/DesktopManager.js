class DesktopManager
{
	constructor(taskbarManager)
	{
		this.taskbarManager = taskbarManager;
		this.setupDesktopShortcuts()
	}

	setupDesktopShortcuts()
	{
		const shortcuts = document.querySelectorAll(".desktop__shortcut");
	    shortcuts.forEach((shortcut) => {
	        shortcut.addEventListener("dblclick", () => {
	            const targetWindowId = shortcut.getAttribute("data-window");
	            if (targetWindowId) {
	                WindowManager.openWindow(targetWindowId);
	            }
	        });
	    });
	}
}
