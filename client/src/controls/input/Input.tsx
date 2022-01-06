import { Icon } from "@iconify/react";
import React, {
    ForwardRefRenderFunction,
    PropsWithChildren,
    useEffect,
    useRef,
    useState,
} from "react";
import { theming, utils } from "../../main";
import styles from "./Input.module.scss";
import dismiss16Regular from "@iconify/icons-fluent/dismiss-16-regular";
import search16Regular from "@iconify/icons-fluent/search-16-regular";

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
     * On input change event listener
     */
    onInput?: (value: string) => void;

    /**
     * Icon element
     */
    icon?: JSX.Element | false;
}

export interface RefInstance {}

const Input = React.forwardRef<RefInstance, Props>((props, ref) => {
    props = utils.mergeObject<Props>(
        {
            placeHolder: "",
            height: "35px",
            width: "400px",
            icon: false,
            onInput: () => {}
        },
        props
    );

    const [inputFocused, setInputFocused] = useState(false);
    const [currentValue, setCurrentValue] = useState("");
    const [currentTheme, setCurrentTheme] = useState<theming.Theme>(
        theming.getLoadedTheme()
    );
    const inputRef = useRef<HTMLInputElement>(null);
    let listeners = [] as string[];

    function addListeners() {
        if (listeners.length == 0) {
            listeners.push(
                theming.on("load", () => {
                    setCurrentTheme(theming.getLoadedTheme());
                })
            );
        }
    }

    useEffect(() => {
        addListeners();

        return () => {
            listeners.forEach(theming.removeListener);
            listeners = [];
        };
    });

    return (
        <div onMouseDown={() => inputRef.current!.focus()} className={styles._}>
            <div
                style={{
                    height: props.height,
                    width: props.width,
                }}
                className={styles.input}
            >
                {props.icon && (
                    <div className={styles.icon}>
                        { props.icon }
                    </div>
                )}

                <input
                    onFocus={() => setInputFocused(true)}
                    onBlur={() => setInputFocused(false)}
                    ref={inputRef}
                    onInput={(event) => {
                        setCurrentValue(event.currentTarget.value);
                        props.onInput!(event.currentTarget!.value);
                    }}
                    placeholder={props.placeHolder}
                />

                <button
                    tabIndex={-1}
                    onClick={() => {
                        setCurrentValue("");
                        inputRef.current!.value = "";
                        props.onInput!("");
                    }}
                    onMouseDown={(event) => {
                        event.preventDefault();
                    }}
                    className={
                        currentValue.length > 0 && inputFocused
                            ? styles.buttonEnabled
                            : ""
                    }
                >
                    <Icon icon={dismiss16Regular} />
                </button>

                <button tabIndex={-1}>
                    <Icon icon={search16Regular} />
                </button>
            </div>
        </div>
    );
});

export default Input;
