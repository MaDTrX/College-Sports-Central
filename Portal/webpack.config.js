const path = require("path");
const source = path.resolve(__dirname, "src");

module.exports = {
    context: __dirname,
    entry: "./src/main.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js",
    },
    use: {
      loader: 'babel-loader',
      options: {
        presets: ["@babel/preset-env",
        {
          "useBuiltIns": "entry",
          "corejs": "3.22"
        }],
        ignore: [ './node_modules/mapbox-gl/dist/mapbox-gl.js' ]
      }
    },
    module: {
        rules: [
            {
                test: /\bmapbox-gl-csp-worker.js\b/i,
                use: { loader: "worker-loader" },
            },
        ],
    },
};
