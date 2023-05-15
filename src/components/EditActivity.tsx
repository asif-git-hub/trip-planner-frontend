import React, { Dispatch, useState } from "react"
import { FiEdit } from "react-icons/fi"
import { ActivityType } from "../types/response.types"
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai"
import { MdOutlineDeleteForever } from "react-icons/md"

type EditActivityPropType = {
  dailyActivities: ActivityType[]
  setDailyActivities: Dispatch<React.SetStateAction<ActivityType[]>>
  currentOrder: number
}

export function EditActivity({
  dailyActivities,
  setDailyActivities,
  currentOrder,
}: EditActivityPropType) {
  const [expand, setExpand] = useState(false)

  function moveUp() {
    let newDailyActivities: ActivityType[] = []

    Object.assign(newDailyActivities, dailyActivities)

    if (currentOrder !== 0) {
      const previousActivity = dailyActivities[currentOrder - 1] // Make copy

      newDailyActivities[currentOrder] = previousActivity
      newDailyActivities[currentOrder - 1] = dailyActivities[currentOrder]

      setDailyActivities(newDailyActivities)
    }
    setExpand(!expand)
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
    setExpand(!expand)
  }

  function remove() {
    let newDailyActivities: ActivityType[] = []

    Object.assign(newDailyActivities, dailyActivities)

    if (dailyActivities.length !== 0 && newDailyActivities.length !== 0) {

      newDailyActivities.splice(currentOrder, 1)
      setDailyActivities(newDailyActivities)

    }
    setExpand(!expand)
  }

  return (
    <div className="edit-activity-menu">
      <button
        className="edit-activity-btn"
        onClick={() => {
          setExpand(!expand)
        }}
      >
        <FiEdit className="edit-icon"></FiEdit> Edit{" "}
        {expand ? (
          <AiOutlineUp className="edit-toggle-icon" />
        ) : (
          <AiOutlineDown className="edit-toggle-icon"></AiOutlineDown>
        )}
      </button>

      {expand ? (
        <div className="expandable-btn-container">
          <button className="" onClick={moveUp}>
            <div className="expandable-btn-content">
              <div className="expandable-btn-icon">
                <AiOutlineUp></AiOutlineUp>
              </div>
              <div className="expandable-btn-text">Move Up</div>
            </div>
          </button>
          <button className="" onClick={moveDown}>
            <div className="expandable-btn-content">
              <div className="expandable-btn-icon">
                <AiOutlineDown></AiOutlineDown>
              </div>
              <div className="expandable-btn-text">Move Down</div>
            </div>
          </button>
          <button className="delete-activity-btn" onClick={remove}>
            <div className="expandable-btn-content">
              <div className="expandable-btn-icon">
                <MdOutlineDeleteForever></MdOutlineDeleteForever>
              </div>
              <div className="expandable-btn-text">Remove</div>
            </div>
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  )
}
