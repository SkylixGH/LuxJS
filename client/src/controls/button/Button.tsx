import React from "react";
import { utils } from "../../main";
import styles from "./Button.module.scss";

interface Props {
    /**
     * Button text
     */
    children: string;

    /**
     * If the button should be accent themed
     */
    accent?: boolean;
}

const Button = React.forwardRef((props: Props, ref) => {
    props = utils.mergeObject<Props>({
        children: "",
        accent: false
    }, props);

    return (
        <button className={`${styles._} ${props.accent ? styles._accent : ""}`}>{props.children}</button>
    );
});

export default Button;
