export type DailyActivitiesType = {
    day: number,
    activities: ActivityType[]
}

export type ActivityType = {
    location: string,
    description: string
}