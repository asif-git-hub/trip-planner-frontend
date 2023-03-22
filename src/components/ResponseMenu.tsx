import React, { Dispatch, MouseEvent, SetStateAction } from "react"
import { useState } from "react"

type ResponseMenuPropType = {
  containerToDisplay: string
  setContainerToDisplay: Dispatch<SetStateAction<string>>
}

export function ResponseMenu({
  containerToDisplay,
  setContainerToDisplay,
}: ResponseMenuPropType) {
  function handleMenuToggle(e: MouseEvent<HTMLElement>) {
    setContainerToDisplay(e.currentTarget.id)
  }

  return (
    <div className="response-menu-container">
      <ul className="response-menu">
        <button
          id="itinerary-button"
          className={`${
            containerToDisplay === "itinerary-button"
              ? "response-menu-selected"
              : ""
          } response-menu-item`}
          onClick={handleMenuToggle}
        >
          Where to Go
        </button>
        <button
          id="food-button"
          className={`${
            containerToDisplay === "food-button" ? "response-menu-selected" : ""
          } response-menu-item`}
          onClick={handleMenuToggle}
        >
          What to Eat
        </button>
      </ul>
    </div>
  )
}
