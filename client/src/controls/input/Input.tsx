import React from "react";
import { utils } from "../../main";
import styles from "./Input.module.scss";

interface Props {
    /**
     * Place holder text
     */
    placeHolder?: string;

    /**
     * CSS height for the input
     */
    height?: string;

    /**
     * CSS width for the input
     */
    width?: string;

    /**
     * Icon element
     */
    icon?: JSX.Element | false;
}

const Input = React.forwardRef((props: Props, ref) => {
    props = utils.mergeObject<Props>({
        placeHolder: "",
        height: "35px",
        width: "400px",
        icon: false
    }, props);

    return (
        <div className={styles._}>
            <div style={{
                height: props.height,
                width: props.width
            }} className={styles.input}>
                { props.icon && <div className={styles.icon}>
                    { props.icon }
                </div> }

                <input placeholder={props.placeHolder} />
            </div>
        </div>
    );
});

export default Input;
