module.exports = function (js) {
  // TODO - this isn't particularly robust atm...
  // By outputing a "require", we defer resolution of the actual image to the responsive-image-loader package.
  return js.replace(/"\/src\/img(.*)"/, ' require("../img/gallery$1")');
};
