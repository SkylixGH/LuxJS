import { getProjectDirs, runInDirs } from "../utils.js";

runInDirs(getProjectDirs(), "npm i -D rollup typescript @rollup/plugin-typescript @rollup/plugin-node-resolve @rollup/plugin-commonjs");
