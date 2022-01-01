import React from "react";
import ReactDOM from "react-dom";
import { theming, themingThemes } from "../../../../src/main";
import Root from "./Root";
import pkg from "../../package.json";

const customThemeCSS = theming.buildCSSFromPalette(
    {
        textColor: "#FFFFFF",
        backgroundColor: "#121212",
    },
    true
);

theming
    .installTheme(themingThemes.defaultDarkTheme)
    .then(() => {
        console.info("The DarkTheme was installed successfully");

        theming.loadTheme(themingThemes.defaultDarkTheme.author, themingThemes.defaultDarkTheme.name);
        console.log(theming.getInstalledThemes());
    }).catch((errorCode) => {
        if (errorCode == theming.ThemeInstallErrors.themeExists) {
            theming.loadTheme(themingThemes.defaultDarkTheme.author, themingThemes.defaultDarkTheme.name);
        }
    });

ReactDOM.render(
    <React.StrictMode>
        <Root />
    </React.StrictMode>,
    document.getElementById("root")
);
