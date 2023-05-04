import React, { useState } from "react"
import { DailyActivitiesType, ActivityType } from "../types/response.types"
import { createMapQuery } from "../utils/google.utils"
import { options } from "../data/activity.options"
import { RoundButton } from "./RoundButton"
import { LinkedActivityDetails } from "./LinkedActivityDetails"
import { BiMessageAdd } from "react-icons/bi"
import { AddActivityModal } from "./AddActivityModal"
import { getCountryCode } from "../utils/destination.utils"

type DailyActivitiesListPropType = DailyActivitiesType & {
  destination: string
  id: number
}

export function DailyActivitiesList({
  id,
  day,
  destination,
  activities,
  city,
}: DailyActivitiesListPropType) {
  const [showActivityForm, setShowActivityForm] = useState(false)
  const [newActivity, setNewActivity] = useState<ActivityType>({
    location: "",
    description: "",
    custom: true,
  })
  const [dailyActivities, setDailyActivities] = useState(activities)

  let mapsUrl = createMapQuery(
    dailyActivities, //TODO: use dailyActivities
    destination.replace(/ /g, "+").replace(",", "")
  )

  // country code for geo restriction for google search
  const countrycode = getCountryCode(destination)

  return (
    <div className="activitieslist-container" key={id}>
      <div className="day-container" key={day}>
        <h2>
          Day {day}
          {city ? `: ${city}` : ""}
        </h2>
      </div>

      <div className="meal-links-container" key={parseInt(`1${day}${id}`)}>
        {options.map((option, id) => {
          const link = `http://www.google.com/maps/search/${option.name}/@${dailyActivities[0].geocode?.latitude},${dailyActivities[0].geocode?.longitude},15z`
          return (
            <RoundButton
              key={parseInt(`${day}${id}`)}
              name={option.name}
              link={link}
            ></RoundButton>
          )
        })}
      </div>

      {dailyActivities.map((activity, id) => {
        return (
          <div key={parseInt(`${day}${id}`)}>
            <LinkedActivityDetails
              key={parseInt(`${day}${id}`)}
              location={activity.location}
              destination={destination}
              description={activity.description}
              custom={activity.custom}
            ></LinkedActivityDetails>
          </div>
        )
      })}

      <div className="daily-activity-control-container">
        <div className="add-activity-container">
          <button
            className="add-activity-btn"
            onClick={() => setShowActivityForm(!showActivityForm)}
          >
            Add activity <BiMessageAdd className="add-icon"></BiMessageAdd>
          </button>
        </div>
      </div>

      <AddActivityModal
        key={id}
        day={day}
        showActivityForm={showActivityForm}
        newActivity={newActivity}
        countrycode={countrycode}
        setShowActivityForm={setShowActivityForm}
        setNewActivity={setNewActivity}
        setDailyActivities={setDailyActivities}
      ></AddActivityModal>

      <div className="google-map-code" key={parseInt(`2${day}${id}`)}>
        <iframe
          src={mapsUrl}
          className="google-map"
          loading="lazy"
          title={`Day ${day} activities for ${destination}`}
          referrerPolicy="no-referrer-when-downgrade"
          width="100%"
          height="100%"
          aria-hidden="false"
          tabIndex={0}
        ></iframe>
      </div>
    </div>
  )
}
