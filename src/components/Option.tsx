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
            <label>{label} 
                <input className="checkbox form-row"
                    key={id}
                    id={name}
                    type="checkbox"
                    name={name}
                    checked={checked}
                    onChange={handleChange} 
                    />
            </label>

    )

}