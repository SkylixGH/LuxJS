import React, { useEffect, useRef, useState } from "react";
import { app, utils } from "../../main";
import styles from "./App.module.scss";
import TitleBar from "./titleBar/TitleBar";

interface Props {
    /**
     * App view body
     */
    children: JSX.Element[] | JSX.Element;

    /**
     * The app title
     */
    title?: string;
}

export interface RefInstance {
    /**
     * CSS body container height
     */
    bodyHeight?: string;
}

const App = React.forwardRef<RefInstance, Props>((props, ref) => {
    document.body.style.margin = "0px";

    props = utils.mergeObject<Props>(
        {
            children: <></>,
            title: "",
        },
        props
    );

    const [ bodyHeight, setBodyHeight ] = useState<null | string>(null);
    const bodyRef = useRef<HTMLDivElement>(null);

    function resizeHandle() {
        if (app.getMeta().envMode == "electron") {
            setBodyHeight(window.outerHeight - (document.body.offsetHeight > 40 ? 40 : 0) + "px");
        } else {
            setBodyHeight(document.documentElement.scrollHeight + "px");
        }
    }

    if (bodyHeight == null) {
        window.addEventListener("resize", resizeHandle);
    }

    document.title = props.title!;
    const refClone = ref as { current: RefInstance };
    refClone.current = {} as any;

    useEffect(() => {
        resizeHandle();

        return () => {
            window.removeEventListener("resize", resizeHandle, true);
        }
    });

    return (
        <div className={styles._}>
            { app.getMeta().envMode == "electron" ? <TitleBar osMode="win" title={props.title!} /> : null }

            <div style={{
                height: bodyHeight ?? "0px"
            }} ref={bodyRef}>{props.children}</div>
        </div>
    );
});

export default App;
