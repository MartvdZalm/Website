document.addEventListener("DOMContentLoaded", () => {
	const startMenuManager = new StartMenuManager();
	const windowManager = new WindowManager();
	const taskbarManager = new TaskbarManager();
	const desktopManager = new DesktopManager(taskbarManager);
	const dateTimeManager = new DateTimeManager();
});