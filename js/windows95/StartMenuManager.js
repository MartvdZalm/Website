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

	// setupStartMenuItems()
	// {
	// 	const startMenuItems = document.querySelectorAll(".taskbar__menu__item");
	// 	startMenuItems.forEach((item) => {
	// 		item.addEventListener("click", () => {
	// 			const itemId = item.getAttribute("data-start-menu");
				
	// 			console.log("clicked");

	// 			const submenu = item.querySelector(".taskbar__menu__sub");
	// 			if (submenu) {
	// 				event.stopPropagation();
	// 				submenu.classList.toggle("taskbar__menu__sub--open");
	// 			}

	// 			if (itemId === "shutdown") {
	// 				Router.navigateTo("terminal");
	// 			}
	// 		});
	// 	});

	// 	document.addEventListener("click", (event) => {
	// 		const openSubmenus = document.querySelectorAll("taskbar__menu__sub--open");
	// 		openSubmenus.forEach((submenu) => {
	// 			if (!submenu.contains(event.target)) {
	// 				submenu.classList.remove("taskbar__menu__sub--open");
	// 			}
	// 		});
	// 	});
	// }

	 setupStartMenuItems() {
    const startMenuItems = document.querySelectorAll(".taskbar__menu__item");

    startMenuItems.forEach((item) => {
        item.addEventListener("click", (event) => {
            event.stopPropagation(); // Prevent closing parent menus

            const submenu = item.querySelector(".taskbar__menu__sub");
            if (submenu) {
							const siblingSubmenus = item.parentElement.querySelectorAll(".taskbar__menu__sub--open");
							siblingSubmenus.forEach((sibling) => {
									if (sibling !== submenu) {
											sibling.classList.remove("taskbar__menu__sub--open");
									}
							});
							submenu.classList.toggle("taskbar__menu__sub--open");
            }
        });
    });

    // Close menus when clicking outside
    document.addEventListener("click", (event) => {
        const openSubmenus = document.querySelectorAll(".taskbar__menu__sub--open");
        openSubmenus.forEach((submenu) => {
            if (!submenu.contains(event.target)) {
                submenu.classList.remove("taskbar__menu__sub--open");
            }
        });
    });
	}
}
