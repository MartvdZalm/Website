class StartMenuManager
{
	constructor()
	{
		this.setupStartMenu();
	}

	setupStartMenu()
	{
	    const startMenu = document.getElementById("taskbar-menu");
	    const startMenuButton = document.getElementById("taskbar-start-btn");

	    startMenuButton.addEventListener("click", (event) => {
	        event.currentTarget.classList.toggle("checked");
	        startMenu.classList.toggle("taskbar__menu--open");
	    });

	    document.addEventListener("click", (event) => {
	        if (!startMenu.contains(event.target) && !startMenuButton.contains(event.target)) {
	            startMenu.classList.remove("taskbar__menu--open");
	            startMenuButton.classList.remove("checked");
	        }
	    });	
	}
}