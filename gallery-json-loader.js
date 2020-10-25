const path = require('path');

function escapeDoubleQuotes(str) {
  return str.replace(/"/g, '\\"');
}

module.exports = function (jsonSrc) {
  const obj = JSON.parse(jsonSrc);

  let result = 'module.exports = {';
  Object.entries(obj).forEach(([key, val]) => {
    if (key === 'image') {
      // from the CMS we get an absolute path with project directory as root directory
      const cmsImagePath = obj.image; // e.g. "/src/img/cat1.jpg"
      // convert this to a proper absolute path
      const fullPath = path.resolve(__dirname, `.${cmsImagePath}`);
      // By outputing a "require", we defer resolution of the
      // actual image to the responsive-image-loader package.
      result += `image: require("${escapeDoubleQuotes(fullPath)}"),\n`;
    } else {
      result += `${key}: "${escapeDoubleQuotes(val)}",\n`;
    }
  });
  return `${result}\n};\n`;
};
