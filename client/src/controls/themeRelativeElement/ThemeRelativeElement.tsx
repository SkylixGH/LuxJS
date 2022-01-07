import React, { useEffect, useState } from "react";
import styles from "./ThemeRelativeElement.module.scss";
import { theming, utils } from "../../main";

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
    const [ currentTheme, setCurrentTheme ] = useState(theming.getLoadedTheme());
    let listeners = [] as string[];
    
    function registerListener() {
        if (listeners.length == 0) {
            listeners.push(theming.on("load", () => {
                setCurrentTheme(theming.getLoadedTheme());
            })); 
        }
    }

    registerListener();
 
    useEffect(() => {
        return () => {
            listeners.forEach(theming.removeListener);
            listeners = [];
        }
    });
     
    props = utils.mergeObject<Props>({
        light: <></>,
        dark: <></>
    }, props);

    return (
        <div className={styles._}>{ currentTheme.type == "dark" ? props.dark : props.light }</div>
    );
});

export default ThemeRelativeElement;
