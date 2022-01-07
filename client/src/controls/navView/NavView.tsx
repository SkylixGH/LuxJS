import React, { useState } from "react";
import styles from "./NavView.module.scss";
import { utils } from "../../main";
import ScrollPane from "../scrollPane/ScrollPane";
import navigation16Regular from "@iconify/icons-fluent/navigation-16-regular";
import { Icon } from "@iconify/react";

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

        body: {
            /**
             * Item label
             */
            label: string;

            /**
             * Item action
             */
            action: () => void;

            /**
             * Make this a divider instead of an item
             */
            divider?: boolean;
        }[];

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

    const [ sideBarOpen, setSideBarOpen ] = useState(props.sideBar?.body!.length! > 0 ? true : false);

    return (
        <div className={styles._}>
            <div className={styles.sideRail}>
                <div className={styles.sideRailHeader}>
                    <button onClick={() => {
                        if (sideBarOpen) {
                            setSideBarOpen(false);
                            return;
                        }

                        setSideBarOpen(true);
                    }}>
                        <Icon icon={navigation16Regular} />
                    </button>
                </div>

                <div className={styles.sideRailBody}>
                    { props.sideRail?.map((item, index) => {
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
            </div>

            { props.sideBar && <div className={`${styles.sideBar} ${!sideBarOpen ? styles.sideBarClosed : ""}`}>
                <div className={styles.sideBarBody}>
                    { props.sideBar.body!.map((item, index) => {
                        return (
                            <div className={styles.sideBarBodyItem} onClick={() => {
                                item.action();
                            }} key={ "sideBar-body-" + index }>
                                <div className={styles.sideBarBodyItemIcon}>

                                </div>

                                <span className={styles.sideBarBodyItemLabel}>{item.label}</span>
                            </div>
                        );
                    }) }
                </div>
            </div> }

            <div className={styles.body}>
                <ScrollPane width="100%" height="100%">{props.children}</ScrollPane>
            </div>
        </div>
    );
});

export default NavView;
