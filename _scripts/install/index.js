import { getProjectDirs, runInDirs } from "../utils.js";

runInDirs(getProjectDirs(), "npm i");
