
class ShutDownWindows extends Window
{
  constructor(title, type, icon, contentUrl, fullscreen = false)
  {
    super(title, type, icon, contentUrl, fullscreen);
  }

  setupWindow()
  {
    super.setupWindow();

    this.element.querySelector('.shutdown__yes').addEventListener('click', () => {
      this.shutdown();
    });

    this.element.querySelector('.shutdown__no').addEventListener('click', () => {
      this.close();
    });

    this.element.querySelector('.shutdown__help').addEventListener('click', () => {

    });
  }

  shutdown()
  {
    const selectedOption = this.element.querySelector('input[name="shutdown-option"]:checked');

    console.log("Selected option:", selectedOption.value);

    switch (selectedOption.value) {
      case "shutdown": 
        Router.navigateTo("terminal");
      break;
      
      case "restart":
        Router.navigateTo("terminal", { restart: "yes" });
      break;

      case "ms-dos":
        Router.navigateTo("terminal", { msdos: "yes" });
      break;
    }
  }
}
