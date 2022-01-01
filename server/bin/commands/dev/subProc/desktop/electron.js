const { spawn } = require("child_process");
const electron = require("electron");

/**
 * Process Argv Parameters
 * @[2] App root dir
 * @[3] Dev server port
 */
const proc = spawn(electron, [".", process.argv[3]], {
    cwd: process.argv[2],
});

proc.stdout.on("data", (d) => process.stdout.write(d.toString()));
proc.stderr.on("data", (d) => process.stderr.write(d.toString()));
