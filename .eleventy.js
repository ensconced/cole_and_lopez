module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/img");
  eleventyConfig.addPassthroughCopy("src/styles");
  return {
    dir: {
      input: "built",
      output: "_site",
    },
  };
};
