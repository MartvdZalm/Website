document.addEventListener("DOMContentLoaded", () => {
	const startMenuManager = new StartMenuManager();
	const taskbarManager = new TaskbarManager();
	const windowManager = new WindowManager(taskbarManager);
	const desktopManager = new DesktopManager(taskbarManager);
	const dateTimeManager = new DateTimeManager();
});