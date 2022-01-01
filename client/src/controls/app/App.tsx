import React from "react";
import { utils } from "../../main";
import styles from "./App.module.scss";
import TitleBar from "./titleBar/Titlebar";

interface Props {
    /**
     * App view body
     */
    children: JSX.Element[] | JSX.Element;

    /**
     * The app title
     */
    title?: string;
}

const App = React.forwardRef((props: Props, ref) => {
    props = utils.mergeObject<Props>({
        children: <></>,
        title: ""
    }, props);

    document.title = props.title!;

    return (
        <div className={styles._}>
            <TitleBar osMode="win" title={props.title!} />

            <div>{props.children}</div>
        </div>
    );
});

export default App;
