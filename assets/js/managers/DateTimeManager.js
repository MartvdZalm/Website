class DateTimeManager
{
	constructor()
	{
		this.updateDateTime();
		setInterval(() => this.updateDateTime(), 1000);
	}

	updateDateTime()
	{
		const now = new Date();
		const currentTime = now.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit', hour12: true});
		document.querySelector('.taskbar__time').textContent = currentTime;
	}
}