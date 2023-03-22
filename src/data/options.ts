export type OptionNames =
  | "includeCafes"
  | "includeRestaurants"
  | "includeMuseums"

type OptionType = {
  label: string
  name: OptionNames
}

export const options: OptionType[] = [
  {
    label: "Cafes",
    name: "includeCafes",
  },
  {
    label: "Restaurants",
    name: "includeRestaurants",
  },
  {
    label: "Museums",
    name: "includeMuseums",
  },
]
