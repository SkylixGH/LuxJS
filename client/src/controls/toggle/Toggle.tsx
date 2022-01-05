import React, { useEffect, useState } from "react";
import styles from "./Toggle.module.scss";
import { utils } from "../../main";

interface Props {
    /**
     * Default switched value
     */
    defaultValue?: boolean;

    /**
     * Listen for value changes
     */
    onChange?: (value: boolean) => void;

    /**
     * The side of the toggle switch were the label should render
     */
    labelPosition?: "right" | "left";

    /**
     * Toggle switch label
     */
    label?: string;
}

export interface RefInstance {
    /**
     * The current value of the switch
     */
    value: boolean;
}

const Toggle = React.forwardRef<RefInstance, Props>((props, ref) => {
    props = utils.mergeObject<Props>(
        {
            defaultValue: false,
            onChange: () => {},
            labelPosition: "right",
            label: null
        },
        props
    );

    if (ref == undefined) {
        ref = {} as any;
    }

    const [currentValue, setCurrentValue] = useState(props.defaultValue);
    const refClone = ref as { current: RefInstance };
    refClone.current = {} as any;

    useEffect(() => {
        if (refClone) {
            refClone.current.value = !currentValue;
        }
    }, [ref, currentValue]);

    return (
        <div className={styles._}>
            { props.label && props.labelPosition == "left" && <span className={styles.label}>{props.label}</span> }

            <div
                onClick={() => {
                    if (currentValue) {
                        setCurrentValue(false);
                        props.onChange!(!currentValue);
                        return;
                    }

                    setCurrentValue(true);
                    props.onChange!(!currentValue);
                }}
                className={`${styles.toggle} ${currentValue ? styles.toggleActive : ""}`}
            >
                <div
                    className={`${styles.thumb} ${
                        currentValue ? styles.thumbActive : ""
                    }`}
                />
            </div>

            { props.label && props.labelPosition == "right" && <span className={styles.label}>{props.label}</span> }
        </div>
    );
});

export default Toggle;
