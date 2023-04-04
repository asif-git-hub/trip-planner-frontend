import React from "react"
import { IoFastFoodOutline } from "react-icons/io5"
import { MdCoffee, MdMuseum, MdRestaurant } from "react-icons/md"

type RoundButtonPropType = {
  name: "breakfast" | "lunch" | "dinner" | "museum"
  link: string
}

export function RoundButton({ name, link }: RoundButtonPropType) {
  const iconMap = {
    breakfast: <MdCoffee title={name}></MdCoffee>,
    lunch: <IoFastFoodOutline></IoFastFoodOutline>,
    dinner: <MdRestaurant></MdRestaurant>,
    museum: <MdMuseum></MdMuseum>,
  }
  return (
    <button
      className="round-btn"
      onClick={() => {
        window.open(link, "_blank", "noopener,noreferrer")
      }}
    >
      {iconMap[name]}
    </button>
  )
}
