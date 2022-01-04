import React from "react";
import { utils } from "../../main";
import styles from "./Flex.module.scss";

interface Props {
    /**
     * Flex children
     */
    children: JSX.Element | JSX.Element[];

    /**
     * The CSS gap spacing between all elements
     */
    gap?: string;

    /**
     * The CSS inner padding
     */
    padding?: string;

    /**
     * The CSS outer margin
     */
    margin?: string;

    /**
     * Flex direction
     */
    direction?: "row" | "column";

    /**
     * Contents alignment
     */
    align?: {
        /**
         * Vertical alignment
         */
        vertical?: "center" | "flex-start" | "flex-end";

        /**
         * Horizontal alignment
         */
        horizontal?: "center" | "flex-start" | "flex-end";
    };
}

export interface RefInstance {
    
}

const Flex = React.forwardRef<RefInstance, Props>((props, ref) => {
    props = utils.mergeObject<Props>(
        {
            children: <></>,
            gap: "0px",
            padding: "0px",
            margin: "0px",
            direction: "row",
            align: {
                vertical: "flex-start",
                horizontal: "flex-start",
            },
        },
        props
    );

    return (
        <div
            style={{
                gap: props.gap,
                padding: props.padding,
                margin: props.margin,
                flexDirection: props.direction,
                alignItems: props.align?.vertical,
                justifyContent: props.align?.horizontal,
            }}
            className={styles._}
        >
            {props.children}
        </div>
    );
});

export default Flex;
