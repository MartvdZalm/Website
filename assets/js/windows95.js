function startMenu()
{
    const startMenu = document.getElementById("taskbar-menu");
    const startMenuButton = document.getElementById("taskbar-start-btn");
    // startMenuPrograms are the items in the start menu that have sub programs.
    const startMenuItems = document.getElementsByClassName("taskbar__menu__item--programs");

    startMenuButton.addEventListener("click", (event) => {
        event.currentTarget.classList.toggle("checked");
        startMenu.classList.toggle("taskbar__menu--open");
    });

    for (let i = 0; i < startMenuItems.length; i++) {
        startMenuItems[i].addEventListener("click", (event) => {
            const startMenuSubItems = document.getElementsByClassName("taskbar__menu__sub")

            for (let j = 0; j < startMenuSubItems.length; j++) {
                startMenuSubItems[j].style.display = "none";
            }

            const startMenuSubItem = event.currentTarget.getElementsByClassName("taskbar__menu__sub")[0];

            if (startMenuSubItem) {
                startMenuSubItem.style.display = startMenuSubItem.style.display === "block" ? "none" : "block";
            }
        });
    }
}

function windows()
{
    const closeButtons = document.getElementsByClassName('window__x__btn');

    for (let i = 0; i < closeButtons.length; i++) {
        closeButtons[i].addEventListener('click', () => {
            const windowElement = this.closest('.window');
            windowElement.style.display = 'none';
        });
    }
}

function updateDateTime()
{
    const now = new Date()
    const currentTime = now.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit', hour12: true})
    document.querySelector('.taskbar__time').textContent = currentTime
}

function main()
{
    startMenu();
    windows();

    setInterval(updateDateTime, 1000)
    updateDateTime()
}

document.addEventListener("DOMContentLoaded", () => {
    main();
});
