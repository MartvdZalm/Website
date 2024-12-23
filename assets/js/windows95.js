const start_menu_btn = document.querySelector(".taskbar__btn--start")
const start_menu = document.querySelector(".taskbar__menu")

const programsItem = document.querySelector(".programs");
const programsMenu = document.querySelector(".sub-programs");


start_menu_btn.addEventListener("click", function() {
    this.classList.toggle("checked")
    start_menu.classList.toggle("taskbar__menu--open")
})


programsItem.addEventListener("click", function() {
    console.log(programsMenu);
    programsMenu.classList.toggle("menu-open");
    console.log(programsMenu);
});


function updateDateTime()
{
    const now = new Date()
    const currentTime = now.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit', hour12: true})
    document.querySelector('.taskbar__time').textContent = currentTime
}
setInterval(updateDateTime, 1000)
updateDateTime()
