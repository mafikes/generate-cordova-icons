const Jimp = require('jimp');
const path = require('path');
const fs = require('fs');

const cli_args = process.argv.slice(2);
const image_path = path.join(__dirname, cli_args[0]);
const dir = './res';
const dir_ios = path.join(dir, 'ios');
const dir_android = path.join(dir, 'android');

function prepareFolder() {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
        fs.mkdirSync(dir_ios);
        fs.mkdirSync(dir_android);
    } else {
        deleteFolder(dir);
        prepareFolder();
    }
}

function deleteFolder(folderPath) {
    if (fs.existsSync(folderPath)) {
        fs.readdirSync(folderPath).forEach((file, index) => {
            const curPath = path.join(folderPath, file);
            if (fs.lstatSync(curPath).isDirectory()) { // recurse
                deleteFolder(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(folderPath);
    }
}

function createImage(device, loadImagePath, fileName, width = 256, height = 256, format = 'jpg', quality = 80) {
    Jimp.read(loadImagePath)
        .then(lenna => {
            let output = null;
            if (!fileName) fileName = width + 'x' + height;
            fileName = fileName + '.' + format;

            if (device === 'ios') output = path.join(dir_ios, fileName);
            if (device === 'android') output = path.join(dir_android, fileName);

            console.log(output); // print what will be generated

            if (!output) return false;

            return lenna
                .resize(width, height) // resize
                .quality(quality) // set JPEG quality
                .write(output); // save
        })
        .catch(err => {
            console.error(err);
        });
}

prepareFolder();

/** iOS 8.0+ **/
// iPhone 6 Plus
createImage('ios', image_path, 'icon-60@3x', 180, 180);
/** iOS 7.0+ **/
// iPhone / iPod Touch
createImage('ios', image_path, 'icon-60', 60, 60);
createImage('ios', image_path, 'icon-60@2x', 120, 120);
// iPad
createImage('ios', image_path, 'icon-76', 76, 76);
createImage('ios', image_path, 'icon-76@2x', 152, 152);
// Spotlight Icon
createImage('ios', image_path, 'icon-40', 40, 40);
createImage('ios', image_path, 'icon-40@2x', 80, 80);
/** iOS 6.1 **/
// iPhone / iPod Touch
createImage('ios', image_path, 'icon', 57, 57);
createImage('ios', image_path, 'icon@2x', 144, 114);
// iPad
createImage('ios', image_path, 'icon-72', 72, 72);
createImage('ios', image_path, 'icon-72@2x', 144, 114);
// iPad Pro
createImage('ios', image_path, 'icon-167', 167, 167);
// iPhone Spotlight and Settings Icon
createImage('ios', image_path, 'icon-small', 29, 29);
createImage('ios', image_path, 'icon-small@2x', 58, 58);
createImage('ios', image_path, 'icon-small@3x', 87, 87);
// iPad Spotlight and Settings Icon
createImage('ios', image_path, 'icon-50', 50, 50);
createImage('ios', image_path, 'icon-50@2x', 100, 100);
// iPad Pro
createImage('ios', image_path, 'icon-83.5@2x', 167, 167);

/** Android **/
// ldpi 36x36
createImage('android', image_path, 'ldpi', 36, 36);
// mdpi 48x48
createImage('android', image_path, 'mdpi', 48, 48);
// hdpi 72x72
createImage('android', image_path, 'hdpi', 72, 72);
// xhdpi 96x96
createImage('android', image_path, 'xhdpi', 96, 96);
// xxhdpi 144x144
createImage('android', image_path, 'xxhdpi', 144, 144);
// xxxhdpi 192x192
createImage('android', image_path, 'xxxhdpi', 192, 192);

