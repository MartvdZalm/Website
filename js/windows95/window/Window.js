class Window
{
    constructor(title, icon, contentUrl)
    {
        const uniqueId = crypto.randomUUID();
        this.id = title + "-" + uniqueId;
        this.title = title;
        this.icon = icon;
        this.contentUrl = contentUrl;
        this.element = null;
    }

    async createWindow()
    {
        const window = document.createElement('section');
        window.classList.add('window');
        window.setAttribute('data-window-id', this.id);

        const response = await fetch(this.contentUrl);
        const content = await response.text();

        window.innerHTML = `
            <header class="window__header">
                <span class="window__header__item">
                    <img class="window__header__icon" src="assets/images/windows95/${this.icon}"> - 
                    ${this.title}
                </span>
                <span class="window__header__item">
                    <button class="window__x__btn">X</button>
                </span>
            </header>
            <section class="window__section">${content}</section>
        `;

        this.element = window;
    }

    setZIndex(zIndex)
    {
        this.element.style.zIndex = zIndex;
    }

    getZIndex()
    {
        return this.element.style.zIndex;
    }

    getWindow()
    {
        return this.element;
    }

    async open()
    {
        const mainElement = document.getElementById("windows95");
        await this.createWindow();
        mainElement.appendChild(this.element);
        TaskbarManager.addToTaskbar(this);
        WindowManager.bringToFront(this);
        this.setupWindow();
    }

    setupWindow()
    {
        this.makeDraggable();
        this.makeResizable();

        this.element.querySelector('.window__x__btn').addEventListener('click', () => {
            this.close();
            TaskbarManager.removeFromTaskbar(this);
        });
        
        this.element.addEventListener("mousedown", () => WindowManager.bringToFront(this));
    }

    close()
    {
        this.element.remove();
    }

    makeDraggable()
    {
        const header = this.element.querySelector(".window__header");
        let isDragging = false;
        let offsetX, offsetY;

        header.addEventListener("mousedown", (e) => {
            isDragging = true;
            offsetX = e.clientX - this.element.getBoundingClientRect().left;
            offsetY = e.clientY - this.element.getBoundingClientRect().top;
        });

        document.addEventListener("mousemove", (e) => {
            if (isDragging) {
                this.element.style.left = `${e.clientX - offsetX}px`;
                this.element.style.top = `${e.clientY - offsetY}px`;
            }
        });

        document.addEventListener("mouseup", () => {
            isDragging = false;
        });
    }

    makeResizable()
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
        this.element.appendChild(resizeHandleBR);

        // Bottom edge
        const resizeHandleB = document.createElement("div");
        resizeHandleB.style.position = "absolute";
        resizeHandleB.style.left = "0";
        resizeHandleB.style.right = "0";
        resizeHandleB.style.bottom = "0";
        resizeHandleB.style.height = `${resizeHandleSize}px`;
        resizeHandleB.style.cursor = "s-resize";
        resizeHandleB.style.backgroundColor = "transparent";
        this.element.appendChild(resizeHandleB);

        // Right edge
        const resizeHandleR = document.createElement("div");
        resizeHandleR.style.position = "absolute";
        resizeHandleR.style.right = "0";
        resizeHandleR.style.top = "0";
        resizeHandleR.style.bottom = "0";
        resizeHandleR.style.width = `${resizeHandleSize}px`;
        resizeHandleR.style.cursor = "e-resize";
        resizeHandleR.style.backgroundColor = "transparent";
        this.element.appendChild(resizeHandleR);

        this.addResizeListener(resizeHandleBR, "br");
        this.addResizeListener(resizeHandleB, "b");
        this.addResizeListener(resizeHandleR, "r");
    }

    addResizeListener(handle, direction)
    {
        let isResizing = false;
        let startX, startY, startWidth, startHeight;

        handle.addEventListener("mousedown", (event) => {
            isResizing = true;
            startX = event.clientX;
            startY = event.clientY;
            startWidth = parseInt(this.element.style.width || this.element.offsetWidth, 10);
            startHeight = parseInt(this.element.style.height || this.element.offsetHeight, 10);
            event.preventDefault();
        });

        document.addEventListener("mousemove", (event) => {
            if (isResizing) {
                if (direction === "br" || direction === "b") {
                    const newHeight = startHeight + (event.clientY - startY);
                    this.element.style.height = `${Math.max(newHeight, 500)}px`;
                }
                if (direction === "br" || direction === "r") {
                    const newWidth = startWidth + (event.clientX - startX);
                    this.element.style.width = `${Math.max(newWidth, 650)}px`;
                }
            }
        });

        document.addEventListener("mouseup", () => {
            isResizing = false;
        });
    }
}

