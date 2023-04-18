import React, { useState } from "react"
import { IoFastFoodOutline } from "react-icons/io5"
import { MdCoffee, MdMuseum, MdRestaurant } from "react-icons/md"

type RoundButtonPropType = {
  name: "breakfast" | "lunch" | "dinner" | "museum"
  link: string
}

export function RoundButton({ name, link }: RoundButtonPropType) {
  const [isSelected, setIsSelected] = useState(false)

  const iconMap = {
    breakfast: <MdCoffee title={name}></MdCoffee>,
    lunch: <IoFastFoodOutline title={name}></IoFastFoodOutline>,
    dinner: <MdRestaurant title={name}></MdRestaurant>,
    museum: <MdMuseum title={name}></MdMuseum>,
  }
  return (
    <button
      className={`round-btn ${
        name === "breakfast" || isSelected ? "round-btn-selected" : ""
      }`}
      onClick={() => {
        setIsSelected(true)
        window.open(link, "_blank", "noopener,noreferrer")
      }}
    >
      <div className={`btn-with-text`}>
        {iconMap[name]}
        <p className="round-btn-txt">{name}</p>
      </div>
    </button>
  )
}
