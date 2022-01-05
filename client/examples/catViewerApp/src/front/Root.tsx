import React, { useState } from "react";
import { App, Button, Flex, Input, ScrollPane, TabView, TCPClient, TextBlock, theming, themingThemes, Toggle } from "../../../../src/main";
import "./styles/globals.scss";

const ws = new TCPClient({
    port: 4040,
    ssl: false
});

ws.on("message", (msg, channel) => {
    console.log(`MSG = ${JSON.stringify(msg)} CHANNEL = ${channel}`);
});

ws.start().then(() => {
    console.log("Connected");
}).catch((errorCode) => {
    console.log("[ WS ] Failed to connect: (" + errorCode + ")");
    console.log("[ WS ] " + ws.exitError?.code);
});

export default React.forwardRef((props: any, ref: any) => {
    const [ tabContents, setTabContents ] = useState<JSX.Element | JSX.Element[] | null>(null);
    const [ currentTab, setCurrentTab ] = useState("Buttons");

    const tabs = [
        {
            name: "Buttons",
            element: (
                <>
                    <TextBlock header={3}>Accent Style</TextBlock>
                    <br />
                    <Button mode="accent">Text</Button>
                    <br />
                    <br />

                    <TextBlock header={3}>Default Style</TextBlock>
                    <br />
                    <Button>Text</Button>
                    <br />
                    <br />

                    <TextBlock header={3}>Outline Style</TextBlock>
                    <br />
                    <Button mode="outline">Text</Button>
                    <br />
                    <br />

                    <TextBlock header={3}>Text Style</TextBlock>
                    <br />
                    <Button mode="text">Text</Button>
                </>
            )
        },
        {
            name: "Headers",
            element: (
                <>
                    <TextBlock header={1}>Text</TextBlock>
                    <TextBlock header={2}>Text</TextBlock>
                    <TextBlock header={3}>Text</TextBlock>
                    <TextBlock header={4}>Text</TextBlock>
                    <TextBlock header={5}>Text</TextBlock>
                    <TextBlock header={6}>Text</TextBlock>
                </>
            )
        },
        {
            name: "Input",
            element: (
                <>
                    <TextBlock header={3}>Generic</TextBlock>
                    <br />
                    <Input />
                    <br />

                    <TextBlock header={3}>Placeholder</TextBlock>
                    <br />
                    <Input placeHolder="Place holder text" />
                    <br />

                    <TextBlock header={3}>Custom Icon</TextBlock>
                    <br />
                    <Input icon={{
                        light: <img src="" />,
                        dark: <img src="" />
                    }} />
                </>
            )
        },
        {
            name: "Switches",
            element: (
                <Flex gap="10px" direction="column">
                    <Toggle />
                    <Toggle />
                    <Toggle />
                    <Toggle />
                    <Toggle />
                    <Toggle />
                    <Toggle />
                    <Toggle />
                </Flex>
            )
        }
    ]

    return (
        <App title="LuxJS Demo #1">
            <ScrollPane height="100%">
                <Flex padding="20px">
                    <TabView tabs={[
                        {
                            label: "First",
                            content: (
                                <>
                                    <Button>First Page</Button>
                                </>
                            )
                        }, 
                        {
                            label: "Second",
                            content: (
                                <>
                                    <Button>Second Page</Button>
                                </>
                            )
                        }
                    ]} />
                </Flex>

                <Flex padding="10px 30px" direction="column" gap="10px">
                    <TextBlock>Light Mode</TextBlock>
                    <Toggle onChange={(light) => {
                        if (light) {
                            theming.loadTheme(themingThemes.defaultLightTheme.author, themingThemes.defaultLightTheme.name);
                            return;
                        }

                        theming.loadTheme(themingThemes.defaultDarkTheme.author, themingThemes.defaultDarkTheme.name);
                    }} />

                    <TextBlock>Send WS Message</TextBlock>
                    <Toggle onChange={(val) => {
                        if (val) {
                            console.log(ws.alive);

                            if (ws.alive) {
                                ws.send("main", {
                                    msg: {
                                        target: "button"
                                    }
                                })
                            }
                        }
                    }} />
                </Flex>

                <div className="tabView">
                    <div className="tabs">
                        { tabs.map(tab => {
                            return (
                                <Button mode={currentTab == tab.name ? "outline" : "text"} onClick={() => {
                                    setCurrentTab(tab.name);
                                }}>{ tab.name }</Button>
                            )
                        }) }
                    </div>

                    <div className="renderer">
                        { tabs.map(tab => {
                            if (tab.name == currentTab) {
                                return tab.element;
                            }
                        }) }
                    </div>
                </div>
            </ScrollPane>
        </App>
    );
});
