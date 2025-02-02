class WindowManager
{
	constructor()
	{
		this.setupWindows();
	}

	setupWindows()
	{
		const closeButtons = document.getElementsByClassName("window__x__btn");
		const allWindows = document.getElementsByClassName("window");

		for (let windowElement of allWindows) {
			this.makeDraggable(windowElement);
			windowElement.addEventListener("mousedown", () => this.bringToFront(windowElement));
		}

		for (let button of closeButtons) {
			button.addEventListener("click", () => {
				const windowElement = button.closest(".window");
				windowElement.style.display = "none";
			});
		}
	}

	makeDraggable(windowElement)
	{
		const header = windowElement.querySelector(".window__header");
		let isDragging = false;
		let offsetX, offsetY;

	    header.addEventListener("mousedown", (e) => {
	        isDragging = true;
	        offsetX = e.clientX - windowElement.getBoundingClientRect().left;
	        offsetY = e.clientY - windowElement.getBoundingClientRect().top;
	    });

	    document.addEventListener("mousemove", (e) => {
	        if (isDragging) {
	            windowElement.style.left = `${e.clientX - offsetX}px`;
	            windowElement.style.top = `${e.clientY - offsetY}px`;
	        }
	    });

	    document.addEventListener("mouseup", () => {
	        isDragging = false;
	    });
	}

	makeResizable(windowElement)
	{

	}

	bringToFront(windowElement)
	{
	    const allWindows = document.getElementsByClassName("window");
	    let maxZIndex = 0;

	    for (let i = 0; i < allWindows.length; i++) {
	        const zIndex = parseInt(allWindows[i].style.zIndex || 0);
	        if (zIndex > maxZIndex) {
	            maxZIndex = zIndex;
	        }
	    }

	    windowElement.style.zIndex = maxZIndex + 1;
	}
}