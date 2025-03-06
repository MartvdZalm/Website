class WindowManager
{
	static windows = [];

	constructor(taskbarManager)
	{
		this.taskbarManager = taskbarManager;
	}

	static openWindow(name)
	{
		const windowClass = new Window(name, Router.url(name));

		if (windowClass) {
			windowClass.open();
			WindowManager.windows.push(windowClass);
		}
	}

	static bringToFront(window)
	{
	    let maxZIndex = 0;

	    for (let i = 0; i < WindowManager.windows.length; i++) {
	        const zIndex = parseInt(WindowManager.windows[i].getZIndex() || 0);
	        if (zIndex > maxZIndex) {
	            maxZIndex = zIndex;
	        }
	    }

	    window.setZIndex(maxZIndex + 1);
	}
}
