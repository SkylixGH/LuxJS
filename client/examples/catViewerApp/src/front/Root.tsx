import React from "react";
import { Button } from "../../../../src/main";
import "./styles/globals.scss";

export default React.forwardRef((props: any, ref: any) => {
    return (
        <div>
            <h1>Demo</h1>
            <Button></Button>
        </div>
    );
});
