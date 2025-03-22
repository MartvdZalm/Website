class Router
{
    static routes = {};
    static windows = {};

    static registerRoute(name, url)
    {
        Router.routes[name] = url;
    }

    static registerWindow(windowClass)
    {
        Router.windows[windowClass.title] = windowClass;
    }

    static navigateTo(name, params = {})
    {
        const route = Router.routes[name];
    
        if (!route) {
            console.error(`Route with name "${name}" not found`);
            return;
        }
    
        const queryString = new URLSearchParams(params).toString();
        const urlWithParams = queryString ? `${route}?${queryString}` : route;
    
        window.location.href = urlWithParams;
    }

    static getWindowByTitle(title)
    {
        return Router.windows[title];
    }
}

const filePath = window.location.hostname === "martvdzalm.github.io" ? "/Website/views/window/" : "/views/window/";

Router.registerRoute('windows95', 'index.html');
Router.registerRoute('terminal', 'terminal.html');

Router.registerWindow(new Window(
        WindowName.WELCOME, 
        WindowType.APPLICATION,
        '',
        filePath + "welcome.html"
    )
);
Router.registerWindow(new Window(
        WindowName.MICROSOFT_INTERNET_EXPLORER,
        WindowType.APPLICATION,
        'windows95-ie-5.ico',
        filePath + "microsoft-internet-explorer.html"
    )
);
Router.registerWindow(new Window(
        WindowName.ABOUT_INTERNET_EXPLORER,
        WindowType.APPLICATION,
        'windows95-ie-5.ico',
        filePath + "about-internet-explorer.html"
    )
);
Router.registerWindow(new ShutDownWindows(
        WindowName.SHUTDOWN,
        WindowType.POPUP,
        null,
        filePath + "shut-down-windows.html"
    )
);

