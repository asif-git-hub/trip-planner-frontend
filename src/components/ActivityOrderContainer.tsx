import React, { Dispatch } from "react"
import { ActivityType } from "../types/response.types"
import {
  TbSquareRoundedChevronDown,
  TbSquareRoundedChevronUp,
} from "react-icons/tb"

type ActivityOrderContainerPropType = {
  dailyActivities: ActivityType[]
  setDailyActivities: Dispatch<React.SetStateAction<ActivityType[]>>
  currentOrder: number
}

export function ActivityOrderContainer({
  dailyActivities,
  setDailyActivities,
  currentOrder,
}: ActivityOrderContainerPropType) {
  function moveUp() {
    let newDailyActivities: ActivityType[] = []

    Object.assign(newDailyActivities, dailyActivities)

    if (currentOrder !== 0) {
      const previousActivity = dailyActivities[currentOrder - 1] // Make copy

      newDailyActivities[currentOrder] = previousActivity
      newDailyActivities[currentOrder - 1] = dailyActivities[currentOrder]

      setDailyActivities(newDailyActivities)
    }
  }

  function moveDown() {
    let newDailyActivities: ActivityType[] = []

    Object.assign(newDailyActivities, dailyActivities)

    if (currentOrder !== dailyActivities.length - 1) {
      const previousActivity = dailyActivities[currentOrder + 1] // Make copy

      newDailyActivities[currentOrder] = previousActivity
      newDailyActivities[currentOrder + 1] = dailyActivities[currentOrder]

      setDailyActivities(newDailyActivities)
    }
  }

  return (
    <div className="activity-order-container">
      <div className="up-down-container">
        <button className="move-activity-btn" onClick={moveUp}>
          <TbSquareRoundedChevronUp></TbSquareRoundedChevronUp>
        </button>

        <button className="move-activity-btn" onClick={moveDown}>
          <TbSquareRoundedChevronDown></TbSquareRoundedChevronDown>
        </button>
      </div>
    </div>
  )
}
