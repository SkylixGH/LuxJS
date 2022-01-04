import React, { useEffect, useRef } from "react";
import {
    App,
    AppRefInstance,
    Button,
    ScrollPane,
    TextBlock,
    theming,
    Toggle,
    ToggleRefInstance,
} from "../../../../src/main";
import "./styles/globals.scss";
import Flex from "./../../../../src/controls/flex/Flex";
import Input from "./../../../../src/controls/input/Input";

export default React.forwardRef((props: any, ref: any) => {
    const toggleRef = useRef<ToggleRefInstance>(null);
    const appRef = useRef<AppRefInstance>(null);

    function loadTheme(type: "dark" | "light") {
        console.log("[ Theme Loader ] Loading theme " + type);

        if (type == "dark") {
            theming.loadTheme("__DEFAULTS__", "Dark");
            return;
        }

        theming.loadTheme("__DEFAULTS__", "Light");
    }

    loadTheme("light");

    useEffect(() => {
        console.log(appRef)
    }, [ appRef ]);

    return (
        <App ref={appRef} title="Cat Viewer Demo">
            <ScrollPane height="100%">
                <Flex gap="10px" padding="20px" direction="column">
                    <TextBlock header={1}>Light Mode</TextBlock>
                    <Flex gap="10px">
                        <Toggle
                            defaultValue={true}
                            ref={toggleRef}
                            onChange={() => {
                                if (toggleRef.current?.value) {
                                    loadTheme("light");
                                    return;
                                }

                                loadTheme("dark");
                            }}
                        />
                    </Flex>

                    <h3
                        style={{
                            fontFamily: "__luxjs__regular__",
                            margin: "10px 0",
                        }}
                    >
                        Buttons
                    </h3>
                    <Flex gap="10px">
                        <Button>Default</Button>
                        <Button mode="accent">Accent</Button>
                        <Button mode="outline">Outline</Button>
                        <Button mode="text">Text</Button>
                    </Flex>

                    <ScrollPane>
                        <TextBlock>Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio explicabo consectetur asperiores commodi architecto ab eius! Iste totam exercitationem unde veniam et numquam dolorem error saepe quibusdam alias corrupti, modi, ipsam quidem, illo temporibus aliquid ut ratione praesentium qui tenetur delectus impedit incidunt. Vel doloribus natus commodi harum maxime, adipisci dolorum repellat excepturi accusantium, accusamus molestias placeat unde nam ex nulla ipsum aut. Laudantium fuga exercitationem, totam dolor consequatur corrupti quia optio consectetur quo. Sit eum ut ipsam odio impedit numquam quibusdam, nesciunt quaerat, eveniet commodi eligendi quia reiciendis rem? Nulla voluptas reiciendis facere quibusdam? Magni, dolor. Hic eius inventore, doloribus ea expedita culpa cumque suscipit voluptatibus tenetur, neque vel. Similique sequi accusamus assumenda odio. Suscipit deserunt expedita architecto alias, perspiciatis molestiae officiis amet quidem dolorem aspernatur corrupti rem dolor neque explicabo? Maiores, eum veritatis tenetur inventore praesentium quod. Corporis officiis aut modi labore libero esse, omnis pariatur, possimus beatae repellat eaque cum iste dolore quaerat ducimus, magni minus nam aspernatur impedit veniam fuga minima ipsa earum necessitatibus. Dolor saepe, ipsa expedita veritatis facere laudantium illo ullam facilis aliquid cupiditate assumenda nihil porro reiciendis perferendis sit magni quaerat hic sint, quis, aperiam sunt blanditiis nesciunt ut. Magni officiis repellat quod.</TextBlock>
                    </ScrollPane>

                    <TextBlock header={1}>Light Mode</TextBlock>
                    <TextBlock header={2}>Light Mode</TextBlock>
                    <TextBlock header={3}>Light Mode</TextBlock>
                    <TextBlock header={4}>Light Mode</TextBlock>
                    <TextBlock header={5}>Light Mode</TextBlock>
                    <TextBlock header={6}>Light Mode</TextBlock>

                    <Flex>
                        <Input
                            icon={{
                                dark: <p>D</p>,
                                light: <p>L</p>,
                            }}
                            placeHolder="Place holder text"
                        />
                    </Flex>
                </Flex>
            </ScrollPane>
        </App>
    );
});
