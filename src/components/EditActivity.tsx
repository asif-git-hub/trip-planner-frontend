import React, { Dispatch, useState } from "react"
import { FiEdit } from "react-icons/fi"
import { ActivityType } from "../types/response.types"
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai"
import { MdOutlineDeleteForever } from "react-icons/md"
import { TbArrowsSort } from "react-icons/tb"
import { FcCalendar } from "react-icons/fc"
import { useGlobalContext } from "../context"

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

  const {
    itineraryResponse,
    expandEditMenu,
    expandEditMoveTo,
    setExpandEditMoveTo,
    handleExpandEditMenuToggle,
    handleExpandEditMoveToToggle,
  } = useGlobalContext()

  const days = itineraryResponse?.length

  function moveUp() {
    let newDailyActivities: ActivityType[] = []

    Object.assign(newDailyActivities, dailyActivities)

    if (currentOrder !== 0) {
      const previousActivity = dailyActivities[currentOrder - 1] // Make copy

      newDailyActivities[currentOrder] = previousActivity
      newDailyActivities[currentOrder - 1] = dailyActivities[currentOrder]

      setDailyActivities(newDailyActivities)
    }
    handleExpandEditMenuToggle(currentOrder)
    handleExpandEditMoveToToggle(currentOrder)
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
    handleExpandEditMenuToggle(currentOrder)
    handleExpandEditMoveToToggle(currentOrder)
  }

  function remove() {
    let newDailyActivities: ActivityType[] = []

    Object.assign(newDailyActivities, dailyActivities)

    if (dailyActivities.length !== 0 && newDailyActivities.length !== 0) {
      newDailyActivities.splice(currentOrder, 1)
      setDailyActivities(newDailyActivities)
    }
    handleExpandEditMenuToggle(currentOrder)
    handleExpandEditMoveToToggle(currentOrder)
  }

  return (
    <div className="edit-activity-menu">
      <button
        className="edit-activity-btn"
        onClick={() => {
          handleExpandEditMenuToggle(currentOrder)
          if (expandEditMenu === undefined) {
            setExpandEditMoveTo(undefined)
          }
        }}
      >
        <FiEdit className="edit-icon"></FiEdit> Edit{" "}
        {expandEditMenu === currentOrder ? (
          <AiOutlineUp className="edit-toggle-icon" />
        ) : (
          <AiOutlineDown className="edit-toggle-icon"></AiOutlineDown>
        )}
      </button>

      {expandEditMenu === currentOrder ? (
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

          <button
            className=""
            onClick={() => {
              handleExpandEditMoveToToggle(currentOrder)
            }}
          >
            <div className="expandable-btn-content">
              <div className="expandable-btn-icon">
                <TbArrowsSort></TbArrowsSort>
              </div>
              <div className="expandable-btn-text">Move To</div>
            </div>
          </button>

          {expandEditMoveTo === currentOrder && days ? (
            <div className="expandable-secondlevel-btn-container">
              {Array.from(Array(days), (value, id) => {
                return (
                  <button key={id}>
                    <div className="expandable-btn-content">
                      <div className="expandable-btn-icon">
                        <FcCalendar></FcCalendar>
                      </div>
                      <div className="expandable-btn-text">Day {id + 1}</div>
                    </div>
                  </button>
                )
              })}
            </div>
          ) : (
            ""
          )}

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
