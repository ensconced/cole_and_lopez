module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("built/**/*.(js|jpg|css|ico|svg)");

  return {
    dir: {
      input: "built",
      output: "_site",
    },
  };
};
