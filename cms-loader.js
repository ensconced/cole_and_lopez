const path = require('path');

function escapeChar(str, char) {
  return str.replace(new RegExp(char, 'g'), `\\${char}`);
}

// convert md string to react component which renders that content
function markupComponentString(markdown) {
  return `() => React.createElement(ReactMarkdown, null, \`${escapeChar(markdown, '`')}\`)`;
}

module.exports = function (jsonSrc) {
  const obj = JSON.parse(jsonSrc);
  let result = `
    const React = require('react');
    const ReactMarkdown = require('react-markdown');
    module.exports = {
  `;

  Object.entries(obj).forEach(([key, val]) => {
    // Any behaviour here should be determined by the keys, not values, because
    // that's what I can control!
    if (key.endsWith('image')) {
      // from the CMS we get an absolute path with project directory as root directory
      // convert this to a proper absolute path
      const fullPath = path.resolve(__dirname, `.${val}`);
      // By outputing a "require", we defer resolution of the
      // actual image to the responsive-image-loader package.
      result += `"${key}": require("${escapeChar(fullPath, '"')}"),\n`;
    } else if (key.endsWith('markdown')) {
      result += `"${key}": ${markupComponentString(val)},\n`;
    } else {
      result += `"${key}": \`${escapeChar(val, '`')}\`,\n`;
    }
  });
  return `${result}\n};\n`;
};
