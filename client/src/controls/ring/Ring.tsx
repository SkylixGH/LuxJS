import React, { useEffect, useRef, useState } from "react";
import styles from "./Ring.module.scss";
import { utils } from "../../main";

interface Props {
    /**
     * Ring spinner size
     */
    size?: number;
}

export interface RefInstance {
    
}

const Ring = React.forwardRef<RefInstance, Props>((props, ref) => {
    props = utils.mergeObject<Props>({
        size: 50
    }, props);

    let circumference = 0;
    let loop: any | null = null;
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
        if (circleRef && !loop) {
            mathCircumference();
            let movingMode = "+" as "+" | "-";
            let currentPercent = 0;

            loop = setInterval(() => { 
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
            if (loop) clearInterval(loop);
            loop = null;
        }
    }, [ circleRef ]);

    return (
        <div className={styles._}>
            <svg
                className={styles.svgRing}
                width={props.size}
                height={props.size}>
                
                <circle
                    ref={circleRef}
                    className={styles.svgRingValue}
                    stroke="white"
                    strokeWidth={props.size! / 12}
                    fill="transparent"
                    r={props.size! / 2.5}
                    cx={props.size! / 2}
                    cy={props.size! / 2}/>
            </svg>
        </div>
    );
});

export default Ring;
