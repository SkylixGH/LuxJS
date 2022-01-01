import React from "react";
import { App, Button } from "../../../../src/main";
import "./styles/globals.scss";
import Flex from './../../../../src/controls/flex/Flex';

export default React.forwardRef((props: any, ref: any) => {
    return (
        <App title="Cat Viewer Demo">
            <Flex gap="10px" padding="20px">
                <Button>Default</Button>
                <Button mode="accent">Default</Button>
                <Button mode="outline">Default</Button>
                <Button mode="text">Default</Button>
            </Flex>
        </App>
    );
});
