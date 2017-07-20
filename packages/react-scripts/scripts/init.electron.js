// electron-build config
'use strict';

const spawn = require('react-dev-utils/crossSpawn');

module.exports = function (appName, appPackage, useYarn) {
    appPackage.main = './electron/main.js'
    appPackage.homepage = '.'
    appPackage.scripts.electron = './node_modules/.bin/electron . --debug'
    appPackage.build = {
        "productName": appName,
        "appId": "org.emsoft." + appName,
        "files": [
            "build/",
            "node_modules/",
            "src/main.js",
            "src/electron/",
            "package.json"
        ],
        "dmg": {
            "contents": [
                {
                    "x": 130,
                    "y": 220
                },
                {
                    "x": 410,
                    "y": 220,
                    "type": "link",
                    "path": "/Applications"
                }
            ]
        },
        "win": {
            "target": [
                "nsis"
            ]
        },
        "linux": {
            "target": [
                "deb",
                "AppImage"
            ]
        },
        "directories": {
            "buildResources": "resources",
            "output": "release"
        }
    }
    // install electron && electron-builder
    let command;
    let args;

    if (useYarn) {
        command = 'yarnpkg';
        args = ['add', '--dev'];
    } else {
        command = 'npm';
        args = ['install', '--save-dev'].filter(e => e);
    }
    args.push('electron', 'electron-builder', 'devtron');

    const proc = spawn.sync(command, args, { stdio: 'inherit' });
    if (proc.status !== 0) {
        console.error(`\`${command} ${args.join(' ')}\` failed`);
        return;
    }
}
