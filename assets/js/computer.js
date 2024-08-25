window.addEventListener('load', () => {
    const isFullScreen = localStorage.getItem('isFullScreen') === 'true';

    if (isFullScreen) {
        toggleFullScreen();
    }
});

function toggleFullScreen()
{
    const frame = document.querySelector('.ibm-frame');
    const screen = document.querySelector('.ibm-screen');
    
    frame.classList.toggle('fullscreen');
    screen.classList.toggle('fullscreen');

    const isFullScreen = frame.classList.contains('fullscreen');
    localStorage.setItem('isFullScreen', isFullScreen ? 'true' : 'false');
}