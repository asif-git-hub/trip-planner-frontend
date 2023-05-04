import { countryCodeMap } from "../data/countries"

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

export function getCountryCode(destination: string): string | null {
  // destination can be strings like Germany or Dhaka, Bangladesh or Melbourne, VIC, Australia

  const destinationComponents = destination.split(",")

  let countrycode = null

  if (destinationComponents.length === 1) {
    // Country
    countrycode = countryCodeMap.get(destination)
  } else {
    countrycode = countryCodeMap.get(
      destinationComponents[destinationComponents.length - 1].replace(" ", "")
    )
  }

  if (!countrycode) {
    return null
  }

  return countrycode
}
