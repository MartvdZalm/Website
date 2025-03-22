class Folder
{
	constructor()
	{
		this.name = '';
		this.location = '';
		this.dateCreated = new Date();
		this.dateModified = new Date();
		this.dateAccessed = new Date();
		this.files = [];
		this.subfolders = [];
	}

	setName(name)
	{
		this.name = name;
		return this;
	}

	getName()
	{
		return this.name;
	}

	setLocation(location)
	{
		this.location = location;
		return this;
	}

	getLocation()
	{
		return this.location;
	}

	setDateCreated(dateCreated)
	{
		this.dateCreated = new Date(dateCreated);
		return this;
	}

	getDateCreated()
	{
		return this.dateCreated;
	}

	setDateModified(dateModified)
	{
		this.dateModified = new Date(dateModified);
		return this;
	}

	getDateModified()
	{
		return this.dateModified;
	}

	setDateAccessed(dateAccessed)
	{
		this.dateAccessed = new Date(dateAccessed);
		return this;
	}

	getDateAccessed()
	{
		return this.dateAccessed;
	}

	addFile(file)
	{
		if (file instanceof File) {
		  this.files.push(file);
		  this.updateModificationTime();
		}
		return this;
	}

	getFiles()
	{
		return this.files;
	}

	addSubfolder(folder)
	{
		if (folder instanceof Folder) {
			this.subfolders.push(folder);
			this.updateModificationTime();
		}
		return this;
	}

	getSubFolders()
	{
		return this.subfolders;
	}

	getSubFolder(folderName)
	{

		return this.subfolders.find((subfolder) => {
			console.log(subfolder.getName().toLowerCase(), folderName.toLowerCase());

			return subfolder.getName().toLowerCase() === folderName.toLowerCase();
		}) || null;
	}

	updateModificationTime()
	{
		this.dateModified = new Date();
	}


	getFolderSize()
	{
		return this.files.reduce((total, file) => total + file.size, 0);
	}

	displayContents()
	{
		let output = `Directory of ${this.name}\n`;
		output += `Location: ${this.location}\n`;
		output += `Date Created: ${this.dateCreated.toLocaleString()}\n`;
		output += `Date Modified: ${this.dateModified.toLocaleString()}\n`;
		output += `Date Accessed: ${this.dateAccessed.toLocaleString()}\n`;
		output += '--------------------------------------------------------\n';

		output += 'Files:\n';
		if (this.files.length > 0) {
			this.files.forEach((file) => {
				output += `${file.name}\t${file.size} bytes\t${file.dateModified.toLocaleString()}\n`;
			});
		} else {
			output += 'No files found.\n';
		}

		output += 'Subfolders:\n';
		if (this.subfolders.length > 0) {
			this.subfolders.forEach((subfolder) => {
				output += `${subfolder.getName()}\tSize: ${subfolder.getFolderSize()} bytes\n`;
			});
		} else {
			output += 'No subfolders found.\n';
		}

		output += '--------------------------------------------------------\n';

		return output;
	}
}
