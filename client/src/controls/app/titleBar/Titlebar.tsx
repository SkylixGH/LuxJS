import styles from "./TitleBar.module.scss";
import { Icon } from "@iconify/react";
import dismiss16Regular from "@iconify/icons-fluent/dismiss-16-regular";
import maximize16Regular from '@iconify/icons-fluent/maximize-16-regular';
import restore16Regular from "@iconify/icons-fluent/restore-16-regular";
import subtract16Regular from "@iconify/icons-fluent/subtract-16-regular";

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

const TitleBar = function(props: Props) {
    return (
        <div className={`${styles._}`}>
            <div className={styles.left}>
                { props.osMode == "win" && <span className={styles.leftTitle}>{props.title}</span> }
            </div>

            <div className={styles.right}>
                { props.osMode == "win" && <div className={styles.rightWinButtons}>
                    <button>
                        <Icon style={{
                            fontSize: "20px"
                        }} icon={subtract16Regular} />
                    </button>

                    <button>
                        <Icon icon={maximize16Regular} />
                    </button>

                    <button>
                        <Icon icon={dismiss16Regular} />
                    </button>
                </div> }
            </div>
        </div>
    );
}

export default TitleBar;
