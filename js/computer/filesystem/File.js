class File
{
	constructor()
	{
		this.name = '';
		this.extension = '';
		this.location = '';
		this.size = 0;
		this.dateCreated = new Date();
		this.dateModified = new Date();
		this.dateAccessed = new Date();
		this.attributes = {};
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

	setExtension(extension)
	{
		this.extension = extension;
		return this;
	}

	getExtension()
	{
		return this.extension;
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

	setSize(size)
	{
		this.size = size;
		return this;
	}

	getSize()
	{
		return this.size;
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

	setAttributes(attributes)
	{
		this.attributes = { ...this.attributes, ...attributes };
		return this;
	}

	getAttributes()
	{
		return this.attributes;
	}

	getFileInfo()
	{
		return {
			name: this.name,
			extension: this.extension,
			location: this.location,
			size: this.size,
			dateCreated: this.dateCreated,
			dateModified: this.dateModified,
			dateAccessed: this.dateAccessed,
			attributes: this.attributes,
		};
	}
}

// Example Usage with Chaining
// const file1 = new File()
//   .setName("document")
//   .setExtension("txt")
//   .setLocation("C:/Documents")
//   .setSize(1024)
//   .setDateCreated("2025-01-01")
//   .setDateModified("2025-03-15")
//   .setDateAccessed("2025-03-15")
//   .setAttributes({ readOnly: true });

// const folder1 = new Folder()
//   .setName("Documents")
//   .setLocation("C:/")
//   .setDateCreated("2025-01-01")
//   .setDateModified("2025-03-01")
//   .setDateAccessed("2025-03-15");

// folder1.addFile(file1);

// console.log(folder1.getFolderInfo());
// console.log(file1.getFileInfo());
