var path = require("path");
module.exports = {
    mode: process.env.NODE_ENV || "development",
    entry: {
        inject: path.join(__dirname, "src/main/index.js"),
        content: path.join(__dirname, "src/main/content.js"),
        background: path.join(__dirname, "src/background/index.js")
    },
    output: {
        path: path.join(__dirname, "extension", "build"),
        filename: "[name].bundle.js"
    },
    devtool: "inline-source-map"
};