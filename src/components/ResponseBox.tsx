import React from "react"
import { DailyActivitiesType } from "../types/response.types";
import { DailyActivitiesList } from "./DailyActivitiesList";

type ResponsePropType = {
    days: string,
    response: string
}

export function ResponseBox({days, response}: ResponsePropType) {
    
    const itinerary: DailyActivitiesType[] = JSON.parse(response);

    return (
        
        <div className="response-container">

            {
                itinerary.map((dailyActivities, id) => {

                    return (
                        <DailyActivitiesList 
                            key={id}
                            day={dailyActivities.day} 
                            activities={dailyActivities.activities}
                        ></DailyActivitiesList>
                    )
                })
            }

        </div>

    )
}