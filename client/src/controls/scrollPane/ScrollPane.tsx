import React from "react";
import styles from "./ScrollPane.module.scss";
import { utils } from "../../main";

interface Props {
    /**
     * Scroll pane contents
     */
    children: JSX.Element | JSX.Element[];

    /**
     * CSS width
     */
    width?: string;

    /**
     * Max CSS width
     */
    maxWidth?: string;

    /**
     * Min CSS width
     */
    minWidth?: string;

    /**
     * CSS height
     */
    height?: string;

    /**
     * Max CSS height
     */
    maxHeight?: string;

    /**
     * Min CSS height
     */
    minHeight?: string;
}

export interface RefInstance {}

const ScrollPane = React.forwardRef<RefInstance, Props>((props, ref) => {
    props = utils.mergeObject<Props>({
        children: <></>,
        width: "100%",
        height: "100px",
        maxWidth: "none",
        minWidth: "none",
        maxHeight: "100px",
        minHeight: "none"
    }, props);

    return (
        <div className={styles._}>
            <div style={{
                width: props.width,
                height: props.height,
                maxHeight: props.maxHeight,
                maxWidth: props.maxWidth,
                minWidth: props.minWidth,
                minHeight: props.minHeight
            }}>{props.children}</div>
        </div>
    );
});

export default ScrollPane;
