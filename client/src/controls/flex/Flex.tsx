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
}

const Flex = React.forwardRef((props: Props, ref) => {
    props = utils.mergeObject<Props>({
        children: <></>,
        gap: "0px",
        padding: "0px",
        margin: "0px"
    }, props);

    return (
        <div style={{
            gap: props.gap,
            padding: props.padding,
            margin: props.margin
        }} className={styles._}>{props.children}</div>
    );
});

export default Flex;
