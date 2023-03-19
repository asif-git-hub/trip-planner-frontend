import React from "react";
import { OptionNames } from "../data/options";

type OptionProps = {
    id: number
    label: string,
    name: OptionNames,
    checked: boolean,
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}
export function Option({id, label, name, checked, handleChange}: OptionProps) {

    return (
        <div className="option">
            <label>{label} 
                <input className="checkbox"
                    id={name}
                    type="checkbox"
                    name={name}
                    checked={checked}
                    onChange={handleChange} 
                    />
            </label>
        </div>

    )

}