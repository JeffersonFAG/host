const NextFederationPlugin = require("@module-federation/nextjs-mf");

module.exports = {
  webpack(config, options) {
    const { isServer } = options;

    config.plugins.push(
      new NextFederationPlugin({
        name: "host",
        filename: "remoteHost",
        remotes: {
          remote1: `remote1@http://localhost:3005/_next/static/${
            isServer ? "ssr" : "chunks"
          }/remoteEntry.js`,
          remote2: `remote2@http://localhost:3006/_next/static/${
            isServer ? "ssr" : "chunks"
          }/remoteEntry.js`,
          remote3: `remote3@http://localhost:3007/_next/static/${
            isServer ? "ssr" : "chunks"
          }/remoteEntry.js`,
        },
        shared: {
          react: {
            singleton: true,
          },
          "react-dom": {
            singleton: true,
          },
        },
      })
    );

    return config;
  },
};
