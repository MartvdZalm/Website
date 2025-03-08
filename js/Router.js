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

    static navigateTo(name)
    {
        const route = Router.routes[name];

        if (route) {
            window.location.href = route;
        } else {
            console.error(`Route with name "${name}" not found`);
        }
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
    Application.WELCOME, 
    '',
    filePath + "welcome.html"
    )
);
Router.registerWindow(new Window(
    Application.MICROSOFT_INTERNET_EXPLORER,
    'windows95-ie-5.ico',
    filePath + "microsoft-internet-explorer.html"
    )
);
Router.registerWindow(new Window(
    Application.ABOUT_INTERNET_EXPLORER,
    'windows95-ie-5.ico',
    filePath + "about-internet-explorer.html"
    )
);
