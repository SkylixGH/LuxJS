import React from "react";
import styles from "./TextBlock.module.scss";
import { utils } from "../../main";

interface Props {
    /**
     * Header text and size
     */
    header?: 1 | 2 | 3 | 4 | 5 | 6 | false;

    /**
     * Text value
     */
    children: string;
}

export interface RefInstance {
    
}

const TextBlock = React.forwardRef<RefInstance, Props>((props, ref) => {
    props = utils.mergeObject<Props>({
        children: "",
        header: false
    }, props);

    return (
        <div className={`${styles._} ${props.header ? styles["_header-" + props.header] : ""}`}>{props.children}</div>
    );
});

export default TextBlock;
