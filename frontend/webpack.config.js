const path = require("path");

module.exports = {
    mode: "production",
    entry: "./scripts/index.js",
    output: {
        path: __dirname + "/dist",
        filename: "bundle.js",
    },
    devtool: "cheap-module-source-map",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                        plugins: [["@babel/plugin-transform-runtime"]],
                    },
                },
            },
        ],
    },
};
