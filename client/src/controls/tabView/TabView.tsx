import React, { useState } from "react";
import styles from "./TabView.module.scss";
import { utils } from "../../main";
import TextBlock from "../text/TextBlock";

interface Props {
    tabs: {
        label: string;
        content: JSX.Element;
    }[];
}

export interface RefInstance {
    
}

const TabView = React.forwardRef<RefInstance, Props>((props, ref) => {
    const [ tabIndex, setTabIndex ] = useState(0);

    props = utils.mergeObject<Props>({
        tabs: []
    }, props);

    if (props.tabs.length == 0) {
        props.tabs.push({
            label: "Label",
            content: (
                <>
                    <TextBlock>Body</TextBlock>
                </>
            )
        })
    }

    return (
        <div className={styles._}>
            <div className={styles.tabs}>
                { props.tabs.map((tab, index) => {
                    return (
                        <button onClick={() => {
                            setTabIndex(index);
                        }} key={ "tab-" + index } className={tabIndex == index ? styles.tabButtonActive : ""}>{tab.label}</button>
                    );
                }) }
            </div>

            <div className={styles.body}>
                { props.tabs.map((tab, index) => {
                    if (index == tabIndex) {
                        return (
                            <div className={styles.bodyPage} key={ "content-" + index }>
                                { tab.content }
                            </div>
                        );
                    }
                }) }
            </div>
        </div>
    );
});

export default TabView;
