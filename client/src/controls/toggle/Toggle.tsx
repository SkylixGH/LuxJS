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
            className={`${styles._} ${currentValue ? styles._active : ""}`}
        >
            <div
                className={`${styles.thumb} ${
                    currentValue ? styles.thumbActive : ""
                }`}
            />
        </div>
    );
});

export default Toggle;
