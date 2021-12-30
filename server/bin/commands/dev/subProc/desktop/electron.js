const { spawn } = require("child_process");

/**
 * Process Argv Parameters
 * @[2] App root dir
 * @[3] Dev server port
 */
const proc = spawn(process.platform == "win32" ? "npx.cmd" : "npx", [ "electron", ".", process.argv[3] ], {
    cwd: process.argv[2]
});

proc.stdout.on("data", (d) => process.stdout.write(d.toString()));
proc.stderr.on("data", (d) => process.stderr.write(d.toString()));
