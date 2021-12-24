import { terminal } from "../../src/main";

terminal.info("This is an info message");
terminal.error("This is an error message");
terminal.warning("This is a warning message");
terminal.success("This is a success message");

terminal.setBulletMode(false);
terminal.setTimeStampMode(true);

terminal.info("This is an info message");
terminal.error("This is an error message");
terminal.warning("This is a warning message");
terminal.success("This is a success message");
