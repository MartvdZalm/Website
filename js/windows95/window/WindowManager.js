class Application
{
	static MICROSOFT_INTERNET_EXPLORER = 'Microsoft Internet Explorer';
	static ABOUT_INTERNET_EXPLORER = 'About Internet Explorer';
	static WELCOME = 'welcome';
}

class WindowManager
{
	static windows = [];

	static openWindow(title)
	{
		const windowClass = Router.getWindowByTitle(title);
        
        const newWindowClass = new Window(
        	windowClass.title,
        	windowClass.icon,
        	windowClass.contentUrl
        );

		if (newWindowClass) {
			newWindowClass.open();
			WindowManager.windows.push(newWindowClass);
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
