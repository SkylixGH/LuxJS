import path from "path";
import fs from "fs";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const exec = require("child_process"); 

const __dirname = dirname(fileURLToPath(import.meta.url));
const nonProjectPaths = [ "node_modules", "_scripts", ".git", "package-lock.json", "package.json", "tsconfig.json" ];

export function getProjectDirs() {
    const projectDirs = [];
    const allDirContents = fs.readdirSync(path.join(__dirname, "../"));

    allDirContents.forEach(pathName => {
        if (!nonProjectPaths.includes(pathName)) {
            projectDirs.push(pathName);
        }
    });

    return projectDirs;
}

export function runInDirs(dirs, command) {
    dirs.forEach(async (dir) => {
        const dirProcess = exec(command, {
            cwd: path.join(__dirname, "../", dir)
        });

        dirProcess.stdout.on("data", (data) => {
            process.stdout.write(` [ ./${dir} ] [ OUT ]: ${data}`);
        });

        dirProcess.stderr.on("data", (data) => {
            process.stdout.write(` [ ./${dir} ] [ OUT ]: ${data}`);
        });
    });
}
