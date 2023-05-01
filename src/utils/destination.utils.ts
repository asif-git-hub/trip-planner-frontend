const citiesAsCountries = ["Singapore"]

export function determineDestinationType(
  destination: string
): "country" | "city" {
  // If the destination is Munich, Germany. It is likely a city
  // If the destination is Bangladesh without any comas, it is likely a country
  if (destination.split(",").length === 1) {
    if (citiesAsCountries.includes(destination)) {
      // Some cities has the same name as a country, for example, Singapore
      return "city"
    }
    return "country"
  } else {
    return "city"
  }
}
