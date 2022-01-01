import React from "react";
import { App, Button } from "../../../../src/main";
import "./styles/globals.scss";

export default React.forwardRef((props: any, ref: any) => {
    return (
        <App title="Cat Viewer Demo">
            <Button>Default</Button>
            <Button accent>Default</Button>
        </App>
    );
});
