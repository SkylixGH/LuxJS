import React from "react";
import ReactDOM from "react-dom";
import { theming } from "../../../../src/main";
import Root from "./Root";
import pkg from "../../package.json";

const customThemeCSS = theming.buildCSSFromPalette({
    textColor: "#FFFFFF",
    backgroundColor: "#121212"
}, true);

theming.installTheme({
    name: "Dark-Theme",
    type: "dark",
    author: "Skylix-LuxJS",
    palette: {
        text_primary: "#FFFFFF",
        text_secondary: "#999999"
    },
    version: pkg.version
}).then(() => {
    console.info("The DarkTheme was installed successfully");

    theming.loadTheme("Skylix-LuxJS", "Dark-Theme");
}).catch((errorCode) => {
    console.error("An error was thrown in promise:" + errorCode);
    console.error("Failed to install theme:", Object.keys(theming.ThemeInstallErrors).find(key => theming.ThemeInstallErrors[key as any] === errorCode)?.toUpperCase());
});

ReactDOM.render(
    <React.StrictMode>
        <Root />
    </React.StrictMode>,
    document.getElementById("root")
);
