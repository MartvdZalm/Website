class TaskbarManager
{
	static addToTaskbar(windowClass)
	{
	    const taskbar = document.querySelector(".taskbar");
	    const taskbarItem = document.createElement("div");
	    taskbarItem.className = "taskbar__item taskbar__item--window";
	    taskbarItem.textContent = windowClass.title;
	    taskbarItem.setAttribute("data-window-id", windowClass.element.getAttribute("data-window-id"));

	    taskbarItem.addEventListener("click", () => {
	        if (windowClass.element.style.display === "none") {
	            windowClass.element.style.display = "block";
	            taskbarItem.classList.add("active");
	        } else {
	            windowClass.element.style.display = "none";
	            taskbarItem.classList.remove("active");
	        }
	    });    

	    taskbar.insertBefore(taskbarItem, document.querySelector(".taskbar--clock"));
	}

	static removeFromTaskbar(windowClass)
	{
		const allTaskbarItems = document.querySelectorAll(".taskbar__item--window");

		allTaskbarItems.forEach(taskbarItem => {
			if (taskbarItem.getAttribute("data-window-id") === windowClass.element.getAttribute("data-window-id")) {
				taskbarItem.remove();
			}
		});
	}
}
