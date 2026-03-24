const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@igorao79/uivix"],
  webpack: (config) => {
    config.resolve.alias["@igorao79/uivix"] = path.resolve(
      __dirname,
      "../../packages/uixy/src/index.ts"
    );
    return config;
  },
};

module.exports = nextConfig;
