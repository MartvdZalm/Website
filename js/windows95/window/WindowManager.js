class Application
{
	static MICROSOFT_INTERNET_EXPLORER = 'Microsoft Internet Explorer';
	static ABOUT_INTERNET_EXPLORER = 'About Internet Explorer';
	static WELCOME = 'Welcome';
	static SHUTDOWN_POPUP = 'Shutdown Popup';
}

class WindowManager
{
	static windows = [];

	static openWindow(title, fullscreen = false)
	{
		const windowClass = Router.getWindowByTitle(title);
        
        const newWindowClass = new Window(
        	windowClass.title,
        	windowClass.icon,
        	windowClass.contentUrl,
        	fullscreen
        );

		if (newWindowClass) {
			newWindowClass.open();
			WindowManager.windows.push(newWindowClass);
		}

		return newWindowClass;
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
