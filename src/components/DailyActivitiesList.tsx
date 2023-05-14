import React, { useState } from "react"
import { DailyActivitiesType, ActivityType } from "../types/response.types"
import { createMapQuery } from "../utils/google.utils"
import { options } from "../data/activity.options"
import { RoundButton } from "./RoundButton"
import { LinkedActivityDetails } from "./LinkedActivityDetails"
import { BiMessageAdd } from "react-icons/bi"
import { AddActivityModal } from "./AddActivityModal"
import {
  determineDestinationType,
  getCountryCode,
} from "../utils/destination.utils"
import { CityTransferMode } from "./CityTransferMode"

type DailyActivitiesListPropType = DailyActivitiesType & {
  destination: string
  id: number
  isDifferentCityNextDay: boolean
  nextCity?: string
}

export function DailyActivitiesList({
  id,
  day,
  destination,
  activities,
  city,
  isDifferentCityNextDay,
  nextCity,
}: DailyActivitiesListPropType) {
  const [showActivityForm, setShowActivityForm] = useState(false)
  const [newActivity, setNewActivity] = useState<ActivityType>({
    location: "",
    description: "",
    custom: true,
  })
  const [dailyActivities, setDailyActivities] = useState(activities)

  let mapsUrl = createMapQuery(dailyActivities, city, destination)

  // country code for geo restriction for google search
  const countrycode = getCountryCode(destination)

  return (
    <div className="activitieslist-container">
      <div className="day-container">
        <h2>
          Day {day}
          {city ? `: ${city}` : ""}
        </h2>
      </div>

      <div className="meal-links-container" key={parseInt(`1${day}${id}`)}>
        {options.map((option, id) => {
          const link = `https://www.google.com/maps/search/${option.name}/@${dailyActivities[0].geocode?.latitude},${dailyActivities[0].geocode?.longitude},15z`
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
          <LinkedActivityDetails
            key={parseInt(`${day}${id}`)}
            location={activity.location}
            destination={destination}
            description={activity.description}
            custom={activity.custom}
            dailyActivities={dailyActivities}
            setDailyActivities={setDailyActivities}
            currentOrder={id}
          ></LinkedActivityDetails>
        )
      })}

      <div key={id} className="daily-activity-control-container">
        <div className="add-activity-container">
          <button
            className="btn-5"
            onClick={() => setShowActivityForm(!showActivityForm)}
          >
            Add Activity <BiMessageAdd className="add-icon"></BiMessageAdd>
          </button>
        </div>
      </div>

      <AddActivityModal
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

      {isDifferentCityNextDay && nextCity && city ? (
        <CityTransferMode
          currentCity={city}
          nextCity={nextCity}
          country={`${determineDestinationType(destination).region}`}
        ></CityTransferMode>
      ) : (
        ""
      )}
    </div>
  )
}
