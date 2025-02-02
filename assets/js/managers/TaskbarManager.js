class TaskbarManager
{
	constructor()
	{
		this.setupTaskbar();
	}

	setupTaskbar()
	{

	}

	addToTaskbar(windowElement)
	{
	    const taskbar = document.querySelector(".taskbar");
	    const taskbarItem = document.createElement("div");
	    taskbarItem.className = "taskbar__item taskbar__item--window";
	    taskbarItem.textContent = windowElement.querySelector(".window__header__item").textContent;

	    taskbarItem.addEventListener("click", () => {
	        if (windowElement.style.display === "none") {
	            windowElement.style.display = "block";
	        } else {
	            windowElement.style.display = "none";
	        }
	    });

	    taskbar.insertBefore(taskbarItem, document.querySelector(".taskbar--clock"));
	}
}