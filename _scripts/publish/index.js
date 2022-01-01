const { getProjectDirs, runInDirs } = require("../utils.js");

runInDirs(getProjectDirs(), "npm publish --access public");
