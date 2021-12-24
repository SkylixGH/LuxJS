const getProjectDirs, runInDirs = require("../utils.js"); 

runInDirs(getProjectDirs(), "npx tsc --watch");
