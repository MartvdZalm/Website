function toggleFullScreen()
{
    const frame = document.querySelector('.ibm-frame');
    const screen = document.querySelector('.ibm-screen');
    frame.classList.toggle('fullscreen');
    screen.classList.toggle('fullscreen');
}