import React from "react"
import { DailyActivitiesType, ItineraryData } from '../types/response.types';
import { ActivityDetails } from "./ActivityDetails"
import { createMapQuery } from "../utils/google.utils"

type DailyActivitiesListPropType = DailyActivitiesType & { destination: string }

export function DailyActivitiesList({
  day,
  destination,
  activities,
  city
}: DailyActivitiesListPropType) {
  let mapsUrl = createMapQuery(
    activities,
    destination.replace(/ /g, "+").replace(",", "")
  )
  return (
    <div className="activitieslist-container">
      <div className="day-container">
        <h2>Day {day}{city? `: ${city}`: ""}</h2>
      </div>

      {activities.map((activity, id) => {
        return (
          <div>
            <ActivityDetails
              key={id}
              location={activity.location}
              description={activity.description}
            ></ActivityDetails>
          </div>
        )
      })}

      <div className="google-map-code">
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
