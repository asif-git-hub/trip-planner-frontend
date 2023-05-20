import React from "react"
import { ResponseMenuButton } from "./ResponseMenuButton"

export function ResponseMenu() {
  return (
    <div className="response-menu-container">
      <div className="response-menu">
        <ResponseMenuButton buttonId="itinerary"></ResponseMenuButton>
        <ResponseMenuButton buttonId="info"></ResponseMenuButton>
        <ResponseMenuButton buttonId="accomodation"></ResponseMenuButton>
      </div>
    </div>
  )
}
