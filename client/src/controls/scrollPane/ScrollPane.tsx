import React from "react";
import styles from "./ScrollPane.module.scss";
import { utils } from "../../main";

interface Props {
    
}

export interface RefInstance {
    
}

const ScrollPane = React.forwardRef<RefInstance, Props>((props, ref) => {
    props = utils.mergeObject<Props>({
    
    }, props);

    return (
        <div className={styles._}>__COMPONENT__</div>
    );
});

export default ScrollPane;
