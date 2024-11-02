const sass = require('sass');
const fs = require('fs');
const path = require('path');

// Define the SCSS and output CSS paths
const scssFile = path.join(__dirname, 'scss', 'main.scss');
const cssFile = path.join(__dirname, 'assets', 'css', 'style.css');

// Compile the SCSS
sass.render({
    file: scssFile,
    outFile: cssFile,
}, (error, result) => {
    if (error) {
        console.error('Error compiling SCSS:', error);
    } else {
        // Write the CSS to the file
        fs.writeFile(cssFile, result.css, (err) => {
            if (err) {
                console.error('Error writing CSS file:', err);
            } else {
                console.log('SCSS compiled successfully to', cssFile);
            }
        });
    }
});
