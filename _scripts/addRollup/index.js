const getProjectDirs, runInDirs = require("../utils.js");

runInDirs(getProjectDirs(), "npm i -D rollup typescript @rollup/plugin-typescript @rollup/plugin-node-resolve @rollup/plugin-commonjs");
