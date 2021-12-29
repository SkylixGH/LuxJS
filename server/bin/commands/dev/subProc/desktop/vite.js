const { spawn } = require("child_process");

/**
 * Process Argv Parameters
 * @[2] App root dir
 */
const proc = spawn(process.platform == "win32" ? "npx.cmd" : "npx", [ "vite", "dev" ], {
    cwd: process.argv[2]
});

proc.stdout.on("data", (d) => process.stdout.write(d.toString()));
proc.stderr.on("data", (d) => process.stderr.write(d.toString()));
