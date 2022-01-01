import React from "react";
import ReactDOM from "react-dom";
import { theming, themingThemes } from "../../../../src/main";
import Root from "./Root";

theming.installTheme(themingThemes.defaultLightTheme).then(() => {
    // theming.loadTheme(themingThemes.defaultLightTheme.author, themingThemes.defaultLightTheme.name).then(() => {
    //     console.log("The light theme has been loaded");
    // });
});

theming.installTheme(themingThemes.defaultDarkTheme).then(() => {
    theming.loadTheme(themingThemes.defaultDarkTheme.author, themingThemes.defaultDarkTheme.name).then(() => {
        console.log("The dark theme has been loaded");
    });
});

ReactDOM.render(
    <React.StrictMode>
        <Root />
    </React.StrictMode>,
    document.getElementById("root")
);
