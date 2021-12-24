import { getProjectDirs, runInDirs } from "../utils.js";

runInDirs(getProjectDirs(), "npx tsc --watch");
