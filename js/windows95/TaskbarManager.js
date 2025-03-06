class TaskbarManager
{
	static addToTaskbar(windowElement)
	{
	    const taskbar = document.querySelector(".taskbar");
	    const taskbarItem = document.createElement("div");
	    taskbarItem.className = "taskbar__item taskbar__item--window";
	    taskbarItem.textContent = windowElement.querySelector(".window__header__item").textContent;
	    taskbarItem.setAttribute("data-window-id", windowElement.getAttribute("data-window-id"));

	    taskbarItem.addEventListener("click", () => {
	        if (windowElement.style.display === "none") {
	            windowElement.style.display = "block";
	            taskbarItem.classList.add("active");
	        } else {
	            windowElement.style.display = "none";
	            taskbarItem.classList.remove("active");
	        }
	    });

	    taskbar.insertBefore(taskbarItem, document.querySelector(".taskbar--clock"));
	}

	static removeFromTaskbar(windowElement)
	{
		const allTaskbarItems = document.querySelectorAll(".taskbar__item--window");

		allTaskbarItems.forEach(taskbarItem => {
			if (taskbarItem.getAttribute("data-window-id") === windowElement.getAttribute("data-window-id")) {
				taskbarItem.remove();
			}
		});
	}
}
