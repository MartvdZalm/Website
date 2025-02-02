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
			this.makeResizable(windowElement);
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
	    const resizeHandleSize = 10; // Size of the resize handle (in pixels)

	    // Bottom-right corner
	    const resizeHandleBR = document.createElement("div");
	    resizeHandleBR.style.position = "absolute";
	    resizeHandleBR.style.right = "0";
	    resizeHandleBR.style.bottom = "0";
	    resizeHandleBR.style.width = `${resizeHandleSize}px`;
	    resizeHandleBR.style.height = `${resizeHandleSize}px`;
	    resizeHandleBR.style.cursor = "se-resize";
	    resizeHandleBR.style.backgroundColor = "transparent";
	    windowElement.appendChild(resizeHandleBR);

	    // Bottom edge
	    const resizeHandleB = document.createElement("div");
	    resizeHandleB.style.position = "absolute";
	    resizeHandleB.style.left = "0";
	    resizeHandleB.style.right = "0";
	    resizeHandleB.style.bottom = "0";
	    resizeHandleB.style.height = `${resizeHandleSize}px`;
	    resizeHandleB.style.cursor = "s-resize";
	    resizeHandleB.style.backgroundColor = "transparent";
	    windowElement.appendChild(resizeHandleB);

	    // Right edge
	    const resizeHandleR = document.createElement("div");
	    resizeHandleR.style.position = "absolute";
	    resizeHandleR.style.right = "0";
	    resizeHandleR.style.top = "0";
	    resizeHandleR.style.bottom = "0";
	    resizeHandleR.style.width = `${resizeHandleSize}px`;
	    resizeHandleR.style.cursor = "e-resize";
	    resizeHandleR.style.backgroundColor = "transparent";
	    windowElement.appendChild(resizeHandleR);

		this.addResizeListener(resizeHandleBR, "br", windowElement);
		this.addResizeListener(resizeHandleB, "b", windowElement);
		this.addResizeListener(resizeHandleR, "r", windowElement);
	}

	addResizeListener(handle, direction, windowElement)
	{
		let isResizing = false;
		let startX, startY, startWidth, startHeight;

		handle.addEventListener("mousedown", (event) => {
			isResizing = true;
			startX = event.clientX;
			startY = event.clientY;
			startWidth = parseInt(windowElement.style.width || windowElement.offsetWidth, 10);
			startHeight = parseInt(windowElement.style.height || windowElement.offsetHeight, 10);
			event.preventDefault();
		});

		document.addEventListener("mousemove", (event) => {
			if (isResizing) {
				if (direction === "br" || direction === "b") {
					const newHeight = startHeight + (event.clientY - startY);
					windowElement.style.height = `${Math.max(newHeight, 500)}px`;
				}
				if (direction === "br" || direction === "r") {
					const newWidth = startWidth + (event.clientX - startX);
					windowElement.style.width = `${Math.max(newWidth, 650)}px`;
				}
			}
		});

		document.addEventListener("mouseup", () => {
			isResizing = false;
		});
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