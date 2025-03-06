class Router
{
    static routes = {};

    static registerRoute(name, url)
    {
        Router.routes[name] = url;
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

    static url(name)
    {
        return Router.routes[name];
    }
}

const filePath = window.location.origin + "/views/window/";

Router.registerRoute('windows95', 'index.html');
Router.registerRoute('terminal', 'terminal.html');

// Windows95 
Router.registerRoute('welcome', filePath + "welcome.html");
Router.registerRoute('internet-explorer', filePath + "internet-explorer.html");
