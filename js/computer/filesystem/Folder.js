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

	getFolderInfo()
	{
		return {
			name: this.name,
			location: this.location,
			dateCreated: this.dateCreated,
			dateModified: this.dateModified,
			dateAccessed: this.dateAccessed,
			size: this.getFolderSize(),
			filesCount: this.files.length,
			subfoldersCount: this.subfolders.length,
		};
	}

	getFolderSize()
	{
		return this.files.reduce((total, file) => total + file.size, 0);
	}
}
