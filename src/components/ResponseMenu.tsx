import React, { MouseEvent } from "react"
import { useGlobalContext } from "../context"
import { TbMap2 } from "react-icons/tb"
import { BsInfoSquare } from "react-icons/bs"
import { ResponseMenuButton } from "./ResponseMenuButton"

export function ResponseMenu() {
  const { containerToDisplay, setContainerToDisplay } = useGlobalContext()

  function handleMenuToggle(e: MouseEvent<HTMLElement>) {
    setContainerToDisplay(e.currentTarget.id)
  }

  return (
    <div className="response-menu-container">
      <div className="response-menu">
        <ResponseMenuButton buttonId="itinerary"></ResponseMenuButton>
        <ResponseMenuButton buttonId="info"></ResponseMenuButton>
        <ResponseMenuButton buttonId="accomodation"></ResponseMenuButton>

        {/* <button
          id="info"
          className={`${
            containerToDisplay === "info" ? "response-menu-selected" : ""
          } response-menu-item`}
          onClick={handleMenuToggle}
        >
          <div>
            <div>What to Know</div>
            <div>
              {containerToDisplay === "info" ? <BsInfoSquare></BsInfoSquare> : ""}
            </div>
          </div>
        </button> */}
        {/* <button
          id="accomodation"
          className={`${
            containerToDisplay === "accomodation"
              ? "response-menu-selected"
              : ""
          } response-menu-item`}
          onClick={handleMenuToggle}
        >
          Where to Stay
        </button> */}
      </div>
    </div>
  )
}
