import React, { MouseEvent } from "react"
import { FiEdit } from "react-icons/fi"
import { ActivityType } from "../types/response.types"
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai"
import { MdOutlineDeleteForever } from "react-icons/md"
import { TbArrowsSort } from "react-icons/tb"
import { FcCalendar } from "react-icons/fc"
import { useGlobalContext } from "../context"

type EditActivityPropType = {
  dailyActivities: ActivityType[]
  currentOrder: number
  dayId: number
}

export function EditActivity({
  dailyActivities,
  currentOrder,
  dayId,
}: EditActivityPropType) {
  const {
    itineraryResponse,
    expandEditMenu,
    expandEditMoveTo,
    setExpandEditMoveTo,
    handleExpandEditMenuToggle,
    handleExpandEditMoveToToggle,
    addActivityToDay,
    moveUp,
    moveDown,
    remove,
  } = useGlobalContext()

  const days = itineraryResponse?.length

  function toggleMenu() {
    handleExpandEditMenuToggle(currentOrder)
    handleExpandEditMoveToToggle(currentOrder)
  }

  function moveTo(e: MouseEvent<HTMLElement>) {
    const moveToIndex = parseInt(e.currentTarget.id)
    addActivityToDay(moveToIndex, dailyActivities[currentOrder])
    remove(dayId, currentOrder)
    toggleMenu()
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
          <button
            className=""
            onClick={() => {
              moveUp(dayId, currentOrder)
              toggleMenu()
            }}
          >
            <div className="expandable-btn-content">
              <div className="expandable-btn-icon">
                <AiOutlineUp></AiOutlineUp>
              </div>
              <div className="expandable-btn-text">Move Up</div>
            </div>
          </button>

          <button
            className=""
            onClick={() => {
              moveDown(dayId, currentOrder)
              toggleMenu()
            }}
          >
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
                if (id !== dayId) {
                  return (
                    <button key={id} onClick={moveTo} id={id.toString()}>
                      <div className="expandable-btn-content">
                        <div className="expandable-btn-icon">
                          <FcCalendar></FcCalendar>
                        </div>
                        <div className="expandable-btn-text">Day {id + 1}</div>
                      </div>
                    </button>
                  )
                }
              })}
            </div>
          ) : (
            ""
          )}

          <button
            className="delete-activity-btn"
            onClick={() => {
              remove(dayId, currentOrder)
              toggleMenu()
            }}
          >
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
