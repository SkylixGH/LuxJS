const getProjectDirs, runInDirs = require("../utils.js"); 

runInDirs(getProjectDirs(), "npm i");
