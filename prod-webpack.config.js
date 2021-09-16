const path = require("path");

const extractThemesPlugin = require('./MapStore2/build/themes.js').extractThemesPlugin;
const ModuleFederationPlugin = require('./MapStore2/build/moduleFederation').plugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');

const paths = {
    base: __dirname,
    dist: path.join(__dirname, "dist"),
    framework: path.join(__dirname, "MapStore2", "web", "client"),
    code: [path.join(__dirname, "js"), path.join(__dirname, "MapStore2", "web", "client")]
};

module.exports = require('./MapStore2/build/buildConfig')({
    bundles: {
        'agrhymet': path.join(__dirname, "js", "app"),
        'agrhymet-embedded': path.join(__dirname, "js", "embedded"),
        'agrhymet-api': path.join(__dirname, "MapStore2", "web", "client", "product", "api"),
        'geostory-embedded': path.join(__dirname, "js", "geostoryEmbedded"),
        "dashboard-embedded": path.join(__dirname, "js", "dashboardEmbedded")
    },
    themeEntries: {
        "themes/agrhymet": path.join(__dirname, "themes", "agrhymet", "theme.less"),
        "themes/dark": path.join(__dirname, "themes", "dark", "theme.less")
    },
    paths,
    plugins: [extractThemesPlugin, ModuleFederationPlugin],
    prod: true,
    publicPath: "dist/",
    cssPrefix: '.agrhymet',
    prodPlugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'indexTemplate.html'),
            chunks: ['agrhymet'],
            inject: "body",
            hash: true
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'embeddedTemplate.html'),
            chunks: ['agrhymet-embedded'],
            inject: "body",
            hash: true,
            filename: 'embedded.html'
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'apiTemplate.html'),
            chunks: ['agrhymet-api'],
            inject: 'head',
            hash: true,
            filename: 'api.html'
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'geostory-embedded-template.html'),
            chunks: ['geostory-embedded'],
            inject: "body",
            hash: true,
            filename: 'geostory-embedded.html'
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'dashboard-embedded-template.html'),
            chunks: ['dashboard-embedded'],
            inject: 'body',
            hash: true,
            filename: 'dashboard-embedded.html'
        })
    ],
    alias: {
        "@mapstore/patcher": path.resolve(__dirname, "node_modules", "@mapstore", "patcher"),
        "@mapstore": path.resolve(__dirname, "MapStore2", "web", "client"),
        "@js": path.resolve(__dirname, "js")
    },
    devServer: null
});
