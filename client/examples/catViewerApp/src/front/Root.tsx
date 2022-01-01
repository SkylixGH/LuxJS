import React from "react";
import { App, Button } from "../../../../src/main";
import "./styles/globals.scss";
import Flex from './../../../../src/controls/flex/Flex';
import Input from './../../../../src/controls/input/Input';
import { Icon } from '@iconify/react';

export default React.forwardRef((props: any, ref: any) => {
    return (
        <App title="Cat Viewer Demo">
            <Flex gap="10px" padding="20px" direction="column">
                <Button>Default</Button>
                <Button mode="accent">Default</Button>
                <Button mode="outline">Default</Button>
                <Button mode="text">Default</Button>

                <Flex>
                    <Input icon={<Icon icon="fluent:search-16-regular" />} placeHolder="Place holder text" />
                </Flex>
            </Flex>
        </App>
    );
});
