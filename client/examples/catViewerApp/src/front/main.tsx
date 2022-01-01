import React from "react";
import ReactDOM from "react-dom";
import { theming, themingThemes } from "../../../../src/main";
import Root from "./Root";

theming
    .installTheme(themingThemes.defaultDarkTheme)
    .then(() => {
        console.info("The DarkTheme was installed successfully");

        theming.loadTheme(themingThemes.defaultDarkTheme.author, themingThemes.defaultDarkTheme.name);
        console.log(theming.getInstalledThemes());
    }).catch((errorCode) => {
        theming.removeTheme(themingThemes.defaultDarkTheme.author, themingThemes.defaultDarkTheme.name).then(() => {
            theming.loadTheme(themingThemes.defaultDarkTheme.author, themingThemes.defaultDarkTheme.name);
        });

        if (errorCode == theming.ThemeInstallErrors.themeExists) {
            theming.loadTheme(themingThemes.defaultDarkTheme.author, themingThemes.defaultDarkTheme.name).catch(() => {});
        }
    });

ReactDOM.render(
    <React.StrictMode>
        <Root />
    </React.StrictMode>,
    document.getElementById("root")
);
