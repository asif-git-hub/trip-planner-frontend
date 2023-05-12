import { countryCodeMap } from "../data/countries"

const citiesAsCountries = ["Singapore"]

type DestinationType = {
  type: "country" | "city"
  region: string
}

export function determineDestinationType(destination: string): DestinationType {
  // If the destination is Munich, Germany. It is likely a city
  // If the destination is Bangladesh without any comas, it is likely a country
  const destinationComponents = destination.split(",")
  if (destinationComponents.length === 1) {
    // This is likely a country
    if (citiesAsCountries.includes(destination)) {
      // Some cities has the same name as a country, for example, Singapore
      return {
        type: "city",
        region: destination,
      }
    }
    return {
      type: "country",
      region: destination,
    }
  } else {  
    // This is likely a city: Munich, Germany or Melbourne, VIC, Australia
    const region = destinationComponents.slice(1).toString()
    return {
      type: "city",
      region
    }
    
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
