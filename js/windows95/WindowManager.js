class WindowName
{
	static MICROSOFT_INTERNET_EXPLORER = 'Microsoft Internet Explorer';
	static ABOUT_INTERNET_EXPLORER = 'About Internet Explorer';
	static WELCOME = 'Welcome';
	static SHUTDOWN = 'Shut Down Windows';
}

class WindowType
{
	static APPLICATION = 'APPLICATION';
	static POPUP = 'POPUP';
}

class WindowManager
{
	static windows = [];

	static openWindow(title, fullscreen = false)
	{
		const windowClass = Router.getWindowByTitle(title).newInstance();

		if (windowClass) {
			windowClass.open();
			WindowManager.windows.push(windowClass);
		}

		return windowClass;
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

	static bindWindows()
	{
		const windows = document.querySelectorAll(".bind__window");
		windows.forEach((window) => {
				window.addEventListener("click", () => {
						const targetWindowId = window.getAttribute("data-bind-window");
						if (targetWindowId) {
							WindowManager.openWindow(targetWindowId);
						}
				});
		});
	}
}
