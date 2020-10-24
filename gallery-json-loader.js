module.exports = function (js) {
  return js.replace(/"\/src\/img(.*)"/, ' require("../img/gallery$1")');
};
