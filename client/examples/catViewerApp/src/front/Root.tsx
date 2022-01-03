import React from "react";
import { App, Button, theming } from "../../../../src/main";
import "./styles/globals.scss";
import Flex from "./../../../../src/controls/flex/Flex";
import Input from "./../../../../src/controls/input/Input";

export default React.forwardRef((props: any, ref: any) => {
    function loadTheme(type: "dark" | "light") {
        console.log("[ Theme Loader ] Loading theme " + type)

        if (type == "dark") {
            theming.loadTheme("__DEFAULTS__", "Dark");
            return;
        }

        theming.loadTheme("__DEFAULTS__", "Light");
    }

    return (
        <App title="Cat Viewer Demo">
            <Flex gap="10px" padding="20px" direction="column">
                <h3 style={{
                    fontFamily: "__luxjs__regular__",
                    margin: "10px 0"
                }}>Theme</h3>
                <Flex gap="10px">
                    <Button onClick={() => loadTheme("dark")}>Dark</Button>
                    <Button mode="accent" onClick={() => loadTheme("light")}>Light</Button>
                </Flex>

                <Flex>
                    <Input
                        icon={{
                            dark: (
                                <img src="https://raw.githubusercontent.com/SkylixGH/Info/main/logos/Logo%20Icon%20Dark.svg" />
                            ),
                            light: <img src="https://raw.githubusercontent.com/SkylixGH/Info/main/logos/Logo%20Icon%20Light.svg" />,
                        }}
                        placeHolder="Place holder text"
                    />
                </Flex>
            </Flex>
        </App>
    );
});
