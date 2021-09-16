const path = require("path");

const extractThemesPlugin = require('./MapStore2/build/themes.js').extractThemesPlugin;
const ModuleFederationPlugin = require('./MapStore2/build/moduleFederation').plugin;

module.exports = require('./MapStore2/build/buildConfig')(
    {
        'agrhymet': path.join(__dirname, "js", "app"),
        'agrhymet-embedded': path.join(__dirname, "js", "embedded"),
        'agrhymet-api': path.join(__dirname, "MapStore2", "web", "client", "product", "api"),
        'geostory-embedded': path.join(__dirname, "js", "geostoryEmbedded"),
        "dashboard-embedded": path.join(__dirname, "js", "dashboardEmbedded")
    },
    {
        "themes/agrhymet": path.join(__dirname, "themes", "agrhymet", "theme.less"),
        "themes/dark": path.join(__dirname, "themes", "dark", "theme.less")
    },
    {
        base: __dirname,
        dist: path.join(__dirname, "dist"),
        framework: path.join(__dirname, "MapStore2", "web", "client"),
        code: [path.join(__dirname, "js"), path.join(__dirname, "MapStore2", "web", "client")]
    },
    [extractThemesPlugin, ModuleFederationPlugin],
    false,
    "dist/",
    '.agrhymet',
    [],
    {
        "@mapstore/patcher": path.resolve(__dirname, "node_modules", "@mapstore", "patcher"),
        "@mapstore": path.resolve(__dirname, "MapStore2", "web", "client"),
        "@js": path.resolve(__dirname, "js")
    }, {
        '/rest': {
            target: "http://localhost:8080/agrhymet"
        },
        '/proxy': {
            target: "http://localhost:8080/agrhymet"
        },
        '/pdf': {
            target: "http://localhost:8080/agrhymet"
        },
        '/agrhymet/pdf': {
            target: "http://localhost:8080/"
        }
    }
);
