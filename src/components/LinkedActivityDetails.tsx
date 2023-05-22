import React, { useState } from "react"
import { ActivityType } from "../types/response.types"
import { EditActivity } from "./EditActivity"
import { useGlobalContext } from "../context"
import { FaChevronCircleDown } from "react-icons/fa"

type LinkedActivityDetailPropType = {
  location: string
  destination: string
  description: string
  custom?: boolean | undefined
  dailyActivities: ActivityType[]
  activityId: number
  dayId: number
}

export function LinkedActivityDetails({
  location,
  destination,
  description,
  custom,
  dailyActivities,
  activityId,
  dayId,
}: LinkedActivityDetailPropType) {
  const {
    selectedDay,
    expandActivityControl,
    handleExpandActivityControlToggle,
  } = useGlobalContext()

  const [expandFirstActivity, setExpandFirstActivity] = useState(
    dayId === 0 && activityId === 0
  )
  const [animateExit, setAnimateExit] = useState("")

  const expandActivity =
    (selectedDay === dayId && expandActivityControl === activityId) ||
    expandFirstActivity

  return (
    <div className={`activity-container ${animateExit}`}>
      <p>
        <strong>{location}</strong>
      </p>
      <i>{description}</i>

      <button
        className={`expand-activity-btn`}
        onClick={() => {
          handleExpandActivityControlToggle(activityId, dayId)
          setExpandFirstActivity(false)
        }}
      >
        <FaChevronCircleDown
          className={`expand-activity-icon ${expandActivity ? "clicked" : ""}`}
        ></FaChevronCircleDown>
      </button>

      {expandActivity ? (
        <div>
          <EditActivity
            dailyActivities={dailyActivities}
            currentOrder={activityId}
            dayId={dayId}
            setAnimateExit={setAnimateExit}
          ></EditActivity>

          {custom ? (
            ""
          ) : (
            <button
              className="details-link btn-4"
              onClick={() => {
                window.open(
                  `/poi/${encodeURIComponent(location)}/${encodeURIComponent(
                    destination
                  )}`,
                  "_blank",
                  "noopener,noreferrer"
                )
              }}
            >
              Discover more
            </button>
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  )
}
