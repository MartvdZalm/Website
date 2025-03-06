class StartMenuManager
{
	constructor()
	{
		this.setupStartMenu();
		this.setupStartMenuItems();
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

	setupStartMenuItems()
	{
		const startMenuItems = document.querySelectorAll(".taskbar__menu__item");
		startMenuItems.forEach((item) => {
			item.addEventListener("click", () => {
				const itemId = item.getAttribute("data-start-menu");
				
				if (itemId === "shutdown") {
					Router.navigateTo("terminal");
				}

			});
		});
	}
}
