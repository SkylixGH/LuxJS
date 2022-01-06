import { GUIWindow } from "../../../../electron";

const window = new GUIWindow({
    size: {
        width: {
            default: 1200,
        },
        height: {
            default: 600,
        },
    },
});
 
window.start();  
