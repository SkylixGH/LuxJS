import React from "react";
import { utils } from "../../main";
import styles from "./Button.module.scss";

interface Props {
    /**
     * Button text
     */
    children: string;

    /**
     * The button's mode
     */
    mode?: "accent" | "default" | "outline" | "text";

    /**
     * Button's click event
     */
    onClick?: () => void;
}

export interface RefInstance {
    
}

const Button = React.forwardRef<RefInstance, Props>((props, ref) => {
    props = utils.mergeObject<Props>(
        {
            children: "",
            mode: "default",
            onClick: () => {},
        },
        props
    );

    return (
        <button
            onClick={props.onClick!}
            className={`${styles._} ${(() => {
                switch (props.mode) {
                    case "accent":
                        return styles._accent;

                    case "default":
                        return "";

                    case "outline":
                        return styles._outline;

                    case "text":
                        return styles._text;
                }
            })()}`}
        >
            {props.children}
        </button>
    );
});

export default Button;
