import React from "react";

type ProgressBarPropType = {
    value: number
}
export function ProgressBar({value}: ProgressBarPropType) {

    return (
        <div className="progressbar-container">
            <progress className="progressbar" value={value} max={100}></progress>
        </div>
    )
}