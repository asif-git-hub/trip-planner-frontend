import React, { MouseEvent } from "react"
import { useGlobalContext } from "../context"
import { TbMap2 } from "react-icons/tb"
import { BsInfoSquare } from "react-icons/bs"
import { MdHotel } from "react-icons/md"

type ResponseMenuButtonPropType = {
  buttonId: "itinerary" | "info" | "accomodation"
}

export function ResponseMenuButton({ buttonId }: ResponseMenuButtonPropType) {
  const { containerToDisplay, setContainerToDisplay } = useGlobalContext()

  function handleMenuToggle(e: MouseEvent<HTMLElement>) {
    if (
      e.currentTarget.id === "itinerary" ||
      e.currentTarget.id === "info" ||
      e.currentTarget.id === "accomodation"
    ) {
      setContainerToDisplay(e.currentTarget.id)
    }
  }

  const buttonTextMap = {
    itinerary: "Itinerary",
    info: "Information",
    accomodation: "Stays",
  }

  const buttonIconMap = {
    itinerary: <TbMap2 className="response-menu-icon"></TbMap2>,
    info: <BsInfoSquare className="response-menu-icon"></BsInfoSquare>,
    accomodation: <MdHotel className="response-menu-icon"></MdHotel>,
  }

  return (
    <button
      id={buttonId}
      className={`${
        containerToDisplay === buttonId ? "response-menu-selected" : ""
      } response-menu-item`}
      onClick={handleMenuToggle}
    >
      <div>
        <p>{buttonTextMap[buttonId]}</p>
        <div>
          {containerToDisplay === buttonId ? buttonIconMap[buttonId] : ""}
        </div>
      </div>
    </button>
  )
}
