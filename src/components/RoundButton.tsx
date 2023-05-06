import React, { useState } from "react"
import { IoFastFoodOutline } from "react-icons/io5"
import {
  MdCoffee,
  MdMuseum,
  MdRestaurant,
  MdOutlineDirectionsTransitFilled,
} from "react-icons/md"
import { AiOutlineCar } from "react-icons/ai"

type RoundButtonPropType = {
  name: "breakfast" | "lunch" | "dinner" | "museum" | "car" | "transit"
  link: string
}

export function RoundButton({ name, link }: RoundButtonPropType) {
  const [isSelected, setIsSelected] = useState(false)

  const iconMap = {
    breakfast: <MdCoffee title={name}></MdCoffee>,
    lunch: <IoFastFoodOutline title={name}></IoFastFoodOutline>,
    dinner: <MdRestaurant title={name}></MdRestaurant>,
    museum: <MdMuseum title={name}></MdMuseum>,
    car: <AiOutlineCar title={name}></AiOutlineCar>,
    transit: (
      <MdOutlineDirectionsTransitFilled
        title={name}
      ></MdOutlineDirectionsTransitFilled>
    ),
  }
  return (
    <button
      className={`round-btn ${
        name === "breakfast" || name === "transit" || isSelected
          ? "round-btn-selected"
          : ""
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
