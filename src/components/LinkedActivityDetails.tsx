import React, { Dispatch, useEffect } from "react"
import { Link } from "react-router-dom"
import { ActivityOrderContainer } from "./ActivityOrderContainer"
import { ActivityType } from "../types/response.types"
import { EditActivity } from "./EditActivity"

type LinkedActivityDetailPropType = {
  location: string
  destination: string
  description: string
  custom?: boolean | undefined
  dailyActivities: ActivityType[]
  setDailyActivities: Dispatch<React.SetStateAction<ActivityType[]>>
  currentOrder: number
}

export function LinkedActivityDetails({
  location,
  destination,
  description,
  custom,
  dailyActivities,
  setDailyActivities,
  currentOrder,
}: LinkedActivityDetailPropType) {
  return (
    <div className="activty-container">
      <p>
        <strong>{location}</strong>
      </p>
      <i>{description}</i>
      {/* <ActivityOrderContainer
        dailyActivities={dailyActivities}
        setDailyActivities={setDailyActivities}
        currentOrder={currentOrder}
      ></ActivityOrderContainer> */}
      <EditActivity
      ></EditActivity>

      {custom ? (
        ""
      ) : (
        <button className="details-link btn-4" onClick={() => {
          window.open(`/poi/${encodeURIComponent(location)}/${encodeURIComponent(destination)}`, '_blank', 'noopener,noreferrer')
        }}>
          Discover more
        </button>
      )}
    </div>
  )
}
