import React from "react";
import styles from "./ThemeRelativeElement.module.scss";
import { utils } from "../../main";

interface Props {
    /**
     * Element for dark theme
     */
    dark: JSX.Element;

    /**
     * Element for light theme
     */
    light: JSX.Element;
}

export interface RefInstance {
    
}

const ThemeRelativeElement = React.forwardRef<RefInstance, Props>((props, ref) => {
    function registerListener() {
        d
    }
    
    props = utils.mergeObject<Props>({
        light: <></>,
        dark: <></>
    }, props);

    return (
        <div className={styles._}>__COMPONENT__</div>
    );
});

export default ThemeRelativeElement;
