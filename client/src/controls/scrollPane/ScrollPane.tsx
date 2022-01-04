import React from "react";
import styles from "./ScrollPane.module.scss";
import { utils } from "../../main";

interface Props {
    /**
     * Scroll pane contents
     */
    children?: JSX.Element | JSX.Element[];
}

export interface RefInstance {}

const ScrollPane = React.forwardRef<RefInstance, Props>((props, ref) => {
    props = utils.mergeObject<Props>({}, props);

    return (
        <div className={styles._}>{props.children}</div>
    );
});

export default ScrollPane;
