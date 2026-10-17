const path = require("path");
const { execSync } = require("child_process");

// Date of the latest commit = date of the latest update (falls back to build date)
function getLastUpdate() {
  try {
    return execSync("git log -1 --format=%cI", { stdio: ["ignore", "pipe", "ignore"] })
      .toString()
      .trim();
  } catch {
    return new Date().toISOString();
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: { NEXT_PUBLIC_LAST_UPDATE: getLastUpdate() },
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
