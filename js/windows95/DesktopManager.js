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
	    shortcuts.forEach(shortcut => {
	        shortcut.addEventListener("dblclick", () => {
	            const targetWindowId = shortcut.getAttribute("data-window");
	            if (targetWindowId) {
	                this.openWindow(targetWindowId);
	            }
	        });
	    });
	}

	openWindow(windowId)
	{
		const windowElement = document.getElementById(windowId);
	    windowElement.style.display = "block";
	    this.taskbarManager.addToTaskbar(windowElement);
	}
}