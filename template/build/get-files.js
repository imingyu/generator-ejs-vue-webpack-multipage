var path = require("path"),
    fs = require("fs");
function getFiles(dir, prefix) {
    var result = [];
    prefix = prefix || '';
    fs.readdirSync(dir).forEach((item, index) => {
        var subDir = path.join(dir, item);
        if (fs.statSync(subDir).isDirectory()) {
            prefix = prefix + "/" + item;
            result = result.concat(getFiles(subDir, prefix));
        } else {
            result.push(prefix + "/" + item);
        }
    });
    return result;
}

module.exports = getFiles;