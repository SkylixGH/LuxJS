import { Commands, CommandsCommand } from "../../src/main";

const bin = new Commands({
    
});

bin.installCommand({
    caller: {
        trigger: "test",
        flag: false
    },
    flags: {
        meow: {
            required: true,
            type: "boolean"
        }
    }
}, (args, flags) => {
    console.log("TEXT >", args, flags);
});

bin.execute("test arg1 arg2 1 --meow.e=true");
