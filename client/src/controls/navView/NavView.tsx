import React from "react";
import styles from "./NavView.module.scss";
import { utils } from "../../main";
import ScrollPane from "../scrollPane/ScrollPane";

interface Props {
    /**
     * View contents
     */
    children: JSX.Element | JSX.Element[];

    /**
     * Side bar contents
     */
    sideBar?: {
        header?: any;

        body?: any;

        footer?: any;
    };

    /**
     * Side rail contents
     */
    sideRail?: {
        /**
         * The label for the icon
         */
        label: string;

        /**
         * The route path the item should take you to
         */
        routePath?: string;

        /**
         * The icon
         */
        icon: JSX.Element;

        /**
         * If the icon is an image, should it fill up the entire space
         */
        iconFillSpace?: boolean;
    }[];
}

export interface RefInstance {
    
}

const NavView = React.forwardRef<RefInstance, Props>((props, ref) => {
    props = utils.mergeObject<Props>({
        children: <></>,
        sideBar: undefined,
        sideRail: undefined
    }, props);

    return (
        <div className={styles._}>
            { props.sideRail && <div className={styles.sideRail}>
                <div className={styles.sideRailHeader}></div>

                <div className={styles.sideRailBody}>
                    { props.sideRail.map((item, index) => {
                        return (
                            <button key={ "sideRail-" + index }>
                                { item.iconFillSpace ? <div className={styles.sideRailItemFillSpaceIcon}>
                                    { item.icon }
                                </div> : <div className={styles.sideRailItemIcon}>
                                    { item.icon }
                                </div> }
                            </button>
                        )
                    }) }
                </div>
            </div> }

            { props.sideBar && <div className={styles.sideBar}></div> }

            <div className={styles.body}>
                <ScrollPane height="100%">{props.children}</ScrollPane>
            </div>
        </div>
    );
});

export default NavView;
