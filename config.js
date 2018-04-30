const path = require('path');

module.exports = {
    buildDir: path.join(__dirname, 'build'),
    buildImagesDir: path.join(__dirname, 'build/assets/images'),
    sourceEntry: path.join(__dirname, 'src/index.jsx'),
    sourceImagesDir: path.join(__dirname, 'src/assets/images'),
};
