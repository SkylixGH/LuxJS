import React, { useEffect, useRef, useState } from "react";
import styles from "./Ring.module.scss";
import { utils } from "../../main";

interface Props {
    
}

export interface RefInstance {
    
}

const Ring = React.forwardRef<RefInstance, Props>((props, ref) => {
    props = utils.mergeObject<Props>({
    
    }, props);

    let circumference = 0;
    let loop: number;
    const circleRef = useRef<SVGCircleElement>(null);

    function mathCircumference() {
        const radius = circleRef.current!.r.baseVal.value;
        circumference = radius * 2 * Math.PI;
    }

    function setValue(percent: number) {
        const offset = circumference - percent / 100 * circumference;
        circleRef.current!.style.strokeDashoffset = offset + "";
    }
    
    useEffect(() => {
        if (circleRef) {
            mathCircumference();
            let movingMode = "+" as "+" | "-";
            let currentPercent = 0;

            setInterval(() => { 
                if (movingMode == "+" && currentPercent >= 80) {
                    movingMode = "-";
                } else if (movingMode == "-" && currentPercent <= 0) {
                    movingMode = "+";
                }

                if (movingMode == "+") {
                    currentPercent++;
                } else {
                    currentPercent--;
                }

                setValue(currentPercent);
            }, 10);

            circleRef.current!.style.strokeDasharray = `${circumference} ${circumference}`;
            circleRef.current!.style.strokeDashoffset = circumference + "";
        }

        return () => {
            clearInterval(loop);
        }
    }, [ circleRef ]);

    return (
        <div className={styles._}>
            <svg
                className={styles.svgRing}
                width="120"
                height="120">
                
                <circle
                    className={styles.svgRingTrack}
                    stroke="#777"
                    stroke-width="4"
                    fill="transparent"
                    r="52"
                    cx="60"
                    cy="60"/>
                
                <circle
                    ref={circleRef}
                    className={styles.svgRingValue}
                    stroke="white"
                    stroke-width="4"
                    fill="transparent"
                    r="52"
                    cx="60"
                    cy="60"/>
            </svg>
        </div>
    );
});

export default Ring;
