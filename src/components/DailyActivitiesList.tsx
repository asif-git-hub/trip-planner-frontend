import React, { useState } from "react"
import { DailyActivitiesType, ActivityType } from "../types/response.types"
import { createMapQuery } from "../utils/google.utils"
import { options } from "../data/activity.options"
import { RoundButton } from "./RoundButton"
import { LinkedActivityDetails } from "./LinkedActivityDetails"
import { MdFormatListBulletedAdd } from "react-icons/md"
import { AddActivityModal } from "./AddActivityModal"
import {
  determineDestinationType,
  getCountryCode,
} from "../utils/destination.utils"
import { CityTransferMode } from "./CityTransferMode"
import { useGlobalContext } from "../context"
import { FaTrashAlt } from "react-icons/fa"

type DailyActivitiesListPropType = DailyActivitiesType & {
  dayId: number
  isDifferentCityNextDay: boolean
  nextCity?: string
}

export function DailyActivitiesList({
  dayId,
  day,
  activities,
  city,
  geocode,
  isDifferentCityNextDay,
  nextCity,
}: DailyActivitiesListPropType) {
  const [showActivityForm, setShowActivityForm] = useState(false)
  const [newActivity, setNewActivity] = useState<ActivityType>({
    location: "",
    description: "",
    custom: true,
  })

  const { itineraryRequest, removeDay } = useGlobalContext()

  let mapsUrl = createMapQuery(activities, city, itineraryRequest.destination)

  // country code for geo restriction for google search
  const countrycode = getCountryCode(itineraryRequest.destination)

  return (
    <div className="activitieslist-container">
      <div className="day-container">
        <h2>
          Day {dayId + 1}
          {city ? `: ${city}` : ""}
        </h2>
        {/* <div className="day-edit-container">
          <button className="day-delete-btn">
            <RxCrossCircled
              className="day-delete-icon"
              onClick={() => {
                removeDay(dayId)
              }}
            ></RxCrossCircled>
          </button>
        </div> */}
      </div>

      <div className="meal-links-container" key={parseInt(`1${day}${dayId}`)}>
        {options.map((option, id) => {
          const link = `https://www.google.com/maps/search/${option.name}/@${geocode.latitude},${geocode.longitude},15z`
          return (
            <RoundButton
              key={parseInt(`${day}${id}`)}
              name={option.name}
              link={link}
            ></RoundButton>
          )
        })}
      </div>

      {activities.map((activity, id) => {
        // daily list of activities per day
        return (
          <LinkedActivityDetails
            key={parseInt(`${day}${id}`)}
            location={activity.location}
            destination={itineraryRequest.destination}
            description={activity.description}
            custom={activity.custom}
            dailyActivities={activities}
            activityId={id}
            dayId={dayId}
          ></LinkedActivityDetails>
        )
      })}

      <div key={dayId} className="daily-activity-control-container">
        <div className="add-activity-container">
          <button
            className="btn-5"
            onClick={() => setShowActivityForm(!showActivityForm)}
          >
            <div className="expandable-btn-content">
              <div className="expandable-btn-icon">
                <MdFormatListBulletedAdd></MdFormatListBulletedAdd>
              </div>
              <div className="expandable-btn-text">Add Activity</div>
            </div>
          </button>
          <button className="btn-5" onClick={() => removeDay(dayId)}>
            <div className="expandable-btn-content">
              <div className="expandable-btn-icon">
                <FaTrashAlt></FaTrashAlt>
              </div>
              <div className="expandable-btn-text">Remove Day</div>
            </div>
            
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
      ></AddActivityModal>

      {mapsUrl ? (
        <div className="google-map-code" key={parseInt(`2${day}${dayId}`)}>
          <iframe
            src={mapsUrl}
            className="google-map"
            loading="lazy"
            title={`Day ${day} activities for ${itineraryRequest.destination}`}
            referrerPolicy="no-referrer-when-downgrade"
            width="100%"
            height="100%"
            aria-hidden="false"
            tabIndex={0}
          ></iframe>
        </div>
      ) : (
        ""
      )}

      {isDifferentCityNextDay && nextCity && city ? (
        <CityTransferMode
          currentCity={city}
          nextCity={nextCity}
          country={`${
            determineDestinationType(itineraryRequest.destination).region
          }`}
        ></CityTransferMode>
      ) : (
        ""
      )}
    </div>
  )
}
