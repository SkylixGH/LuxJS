import React, { useRef } from "react";
import { App, Button, TextBlock, theming, Toggle, ToggleRefInstance } from "../../../../src/main";
import "./styles/globals.scss";
import Flex from "./../../../../src/controls/flex/Flex";
import Input from "./../../../../src/controls/input/Input";

export default React.forwardRef((props: any, ref: any) => {
    const toggleRef = useRef<ToggleRefInstance>(null);

    function loadTheme(type: "dark" | "light") {
        console.log("[ Theme Loader ] Loading theme " + type)

        if (type == "dark") {
            theming.loadTheme("__DEFAULTS__", "Dark");
            return;
        }

        theming.loadTheme("__DEFAULTS__", "Light");
    }

    loadTheme("light");

    return (
        <App title="Cat Viewer Demo">
            <Flex gap="10px" padding="20px" direction="column">
                <TextBlock header={1}>Light Mode</TextBlock>
                <Flex gap="10px">
                    <Toggle defaultValue={true} ref={toggleRef} onChange={() => {
                        if (toggleRef.current?.value) {
                            loadTheme("light");
                            return;
                        }

                        loadTheme("dark");
                    }} />
                </Flex>

                <h3 style={{
                    fontFamily: "__luxjs__regular__",
                    margin: "10px 0"
                }}>Buttons</h3>
                <Flex gap="10px">
                    <Button>Default</Button>
                    <Button mode="accent">Accent</Button>
                    <Button mode="outline">Outline</Button>
                    <Button mode="text">Text</Button>
                </Flex>

                <TextBlock header={1}>Light Mode</TextBlock>
                <TextBlock header={2}>Light Mode</TextBlock>
                <TextBlock header={3}>Light Mode</TextBlock>
                <TextBlock header={4}>Light Mode</TextBlock>
                <TextBlock header={5}>Light Mode</TextBlock>
                <TextBlock header={6}>Light Mode</TextBlock>

                <Flex>
                    <Input
                        icon={{
                            dark: (
                                <p>D</p>
                            ),
                            light: <p>L</p>
                        }}
                        placeHolder="Place holder text"
                    />
                </Flex>
            </Flex>
        </App>
    );
});
