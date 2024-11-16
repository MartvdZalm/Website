const start_menu_btn = document.querySelector(".taskbar__btn--start")
const start_menu = document.querySelector(".taskbar__menu")

start_menu_btn.addEventListener("click", function() {
    this.classList.toggle("checked")
    start_menu.classList.toggle("taskbar__menu--open")
})


function updateDateTime()
{
    const now = new Date()
    const currentTime = now.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit', hour12: true})
    document.querySelector('.taskbar__time').textContent = currentTime
}
setInterval(updateDateTime, 1000)
updateDateTime()
