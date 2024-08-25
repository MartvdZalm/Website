const startButton = document.getElementById("start-button");
const startMenu = document.getElementById("start-menu");
const programsItem = document.querySelector(".programs");
const programsMenu = document.querySelector(".sub-programs");

startButton.addEventListener("click", function() {
    startMenu.classList.toggle("menu-open");
});

programsItem.addEventListener("click", function() {
    console.log(programsMenu);
    programsMenu.classList.toggle("menu-open");
        console.log(programsMenu);

    console.log("dafweads");
});


function updateTime()
{
    var today = new Date();
    var hours24 = today.getHours();
    var hours12;
    var minutes = today.getMinutes();
    var suffix = '';

    if (hours24 >= 12) {
        suffix = " PM";
        hours12 = hours24 % 12;
    } else {
        suffix = " AM";
        hours12 = hours24;
    }

    if (minutes % 10 == 0) {
        minutes = minutes + "0";
    } else if (minutes < 10) {
        minutes = "0" + minutes;
    }

    var time = hours12 + ":" + minutes + suffix;
    var timeBox = document.querySelector(".start-time-text");

    timeBox.innerHTML = time;
}
setInterval(updateTime, 1000);