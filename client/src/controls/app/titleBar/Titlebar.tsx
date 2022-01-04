import styles from "./TitleBar.module.scss";
import { Icon } from "@iconify/react";
import dismiss16Regular from "@iconify/icons-fluent/dismiss-16-regular";
import maximize16Regular from "@iconify/icons-fluent/maximize-16-regular";
import restore16Regular from "@iconify/icons-fluent/restore-16-regular";
import subtract16Regular from "@iconify/icons-fluent/subtract-16-regular";
import fullScreenMinimize24Regular from "@iconify/icons-fluent/full-screen-minimize-24-regular";
import { app } from "../../../main";
import { useEffect, useState } from "react";

interface Props {
    /**
     * Title bar title
     */
    title: string;

    /**
     * The OS to render the title bar for, use windows if on linux platform
     */
    osMode: "win" | "mac";
}

let eventListenersCreated = false;

const TitleBar = function (props: Props) {
    const [appMeta, setAppMeta] = useState<ReturnType<typeof app.getMeta>>(
        app.getMeta()
    );
    let listeners = [] as string[];

    function registerListeners() {
        if (listeners.length == 0) {
            listeners.push(
                app.on("windowStateChange", () => {
                    setAppMeta(app.getMeta());
                })
            );

            listeners.push(
                app.on("windowFocusChange", () => {
                    setAppMeta(app.getMeta());
                })
            );
        }
    }

    function handleSizeButton() {
        if (appMeta.window.state == "fullScreened") {
            app.restoreWindow();
        } else if (appMeta.window.state == "maximized") {
            app.restoreWindow();
        } else {
            app.maximizeWindow();
        }
    }

    useEffect(() => {
        registerListeners();

        return () => {
            listeners.forEach((id) => app.removeListener(id));
            listeners = [];
        };
    });

    return (
        <div
            className={`${styles._} ${
                !appMeta.window.focused ? styles._blurred : ""
            }`}
        >
            <div className={styles.left}>
                {props.osMode == "win" && (
                    <span
                        className={`${styles.leftTitle} ${
                            !appMeta.window.focused
                                ? styles.leftTitleBlurred
                                : ""
                        }`}
                    >
                        {props.title}
                    </span>
                )}

                {props.osMode == "mac" && (
                    <div className={styles.leftMacButtons}>
                        <button></button>

                        <button onClick={() => app.minimizeWindow()}></button>

                        <button onClick={() => handleSizeButton()}></button>
                    </div>
                )}
            </div>

            {props.osMode == "mac" && (
                <div className={styles.middle}>
                    <span
                        className={`${styles.middleText} ${
                            !appMeta.window.focused
                                ? styles.middleTextBlurred
                                : ""
                        }`}
                    >
                        {props.title}
                    </span>
                </div>
            )}

            <div className={styles.right}>
                {props.osMode == "win" && (
                    <div
                        className={`${styles.rightWinButtons} ${
                            !appMeta.window.focused
                                ? styles.rightWinButtonsBlurred
                                : ""
                        }`}
                    >
                        <button onClick={() => app.minimizeWindow()}>
                            <Icon
                                style={{
                                    fontSize: "17px",
                                }}
                                icon={subtract16Regular}
                            />
                        </button>

                        <button onClick={() => handleSizeButton()}>
                            {appMeta?.window.state == "neutral" ? (
                                <Icon icon={maximize16Regular} />
                            ) : appMeta.window.state == "fullScreened" ? (
                                <Icon
                                    style={{
                                        fontSize: "17px",
                                    }}
                                    icon={fullScreenMinimize24Regular}
                                />
                            ) : (
                                <Icon icon={restore16Regular} />
                            )}
                        </button>

                        <button>
                            <Icon icon={dismiss16Regular} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
export default TitleBar;
