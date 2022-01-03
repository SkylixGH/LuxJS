import { terminal } from "../../src/main";
import { exec } from "child_process";

function ask() {
    terminal.readIn(process.cwd(), (answer) => {
        if (answer.length == 0) {
            return "Please specify a command";
        }

        const proc = exec(answer);
    
        proc.stdout.on("data", (d) => {
            const lines = d.toString().split("\n");
    
            lines.forEach(line => {
                terminal.info("[ Stdout ] " + line);
            });
        });
    
        proc.stderr.on("data", (d) => {
            const lines = d.toString().split("\n");
    
            lines.forEach(line => {
                terminal.info("[ Stderr ] " + line);
            });
        });
    
        proc.on("exit", () => {
            ask();
        });
    });
}

ask();
