/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
    additionalData: `@import "src/styles/variables.scss"; @import "src/styles/mixins.scss";`,
  },
};

module.exports = nextConfig;
