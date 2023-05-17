import React, { Dispatch, SetStateAction, useMemo } from "react"
import { FaTimes } from "react-icons/fa"
import { ActivityType } from "../types/response.types"
import { ActivityLocationInput } from "./ActivityLocationInput"
import { useGlobalContext } from "../context"

type AddActivityModalPropType = {
  day: number
  showActivityForm: boolean
  newActivity: ActivityType
  countrycode: string | null
  setShowActivityForm: Dispatch<SetStateAction<boolean>>
  setNewActivity: Dispatch<SetStateAction<ActivityType>>
}

export function AddActivityModal({
  day,
  showActivityForm,
  newActivity,
  countrycode,
  setShowActivityForm,
  setNewActivity,
}: AddActivityModalPropType) {
  const { addActivityToDay } = useGlobalContext()

  function handleSubmit(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault()
    // Add new activity to the activities list
    addActivityToDay(day - 1, newActivity)
    setNewActivity({
      location: "",
      description: "",
      custom: true,
    })
    setShowActivityForm(false) // Close modal
  }

  function handleDescriptionInput(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setNewActivity({ ...newActivity, [e.target.name]: e.target.value })
  }

  const activityAutocompleteOptions = useMemo(
    () => ({
      componentRestrictions: { country: countrycode },
      fields: ["name"],
    }),
    []
  )

  return (
    <div
      className={`${
        showActivityForm
          ? "activity-modal-overlay show-activity-modal"
          : "activity-modal-overlay"
      }`}
    >
      <div className="activity-modal-container">
        <button
          className="close-modal-btn"
          onClick={() => {
            setShowActivityForm(false)
            setNewActivity({
              location: "",
              description: "",
            })
          }}
        >
          <FaTimes></FaTimes>
        </button>

        <h5>
          Add your own activity
          <br></br>
          <br></br>
          <div className="underline"></div>
        </h5>

        <form
          id="activity-form"
          className="activity-form"
          onSubmit={handleSubmit}
        >
          <ActivityLocationInput
            inputName="location"
            placeholder="Enter Activity Location"
            autocompleteOptions={activityAutocompleteOptions}
            data={newActivity}
            setData={setNewActivity}
          ></ActivityLocationInput>

          <textarea
            name="description"
            id="description"
            form="activity-form"
            className="activity-description"
            placeholder="Add a brief description here"
            onChange={handleDescriptionInput}
          ></textarea>
          <div className="">
            <button className="add-activity-btn" type="submit">
              Add Activity to day {day}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
