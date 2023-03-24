import React from "react"
import { FoodRecommendationDetail } from "./FoodRecommendationDetail"
import { FaCoffee } from "react-icons/fa"
import { MdRestaurant } from "react-icons/md"

type FoodRecommendationsPropType = {
  cafes: string
  restaurants: string
}

export function FoodRecommendationList({
  cafes,
  restaurants,
}: FoodRecommendationsPropType) {
  const cafeList: google.maps.places.PlaceResult[] = JSON.parse(cafes)
  const restaurantList: google.maps.places.PlaceResult[] =
    JSON.parse(restaurants)
  return (
    <div>
      <div className="meal-type-container">
        <h1>
          Cafes <FaCoffee className="coffee-icon"></FaCoffee>
        </h1>
        <i>
          Some of the best cafes serving excellent coffee and breakfast to
          kick-start your day
        </i>
      </div>

      {cafeList.map((cafe, id) => {
        const name = cafe.name
        const address = cafe.formatted_address
        const rating = cafe.rating
        const price = cafe.price_level

        return (
          <FoodRecommendationDetail
            key={id}
            name={name}
            address={address}
            rating={rating}
            price={price}
          ></FoodRecommendationDetail>
        )
      })}

      <div className="meal-type-container">
        <h1>
          Restaurants <MdRestaurant className="coffee-icon"></MdRestaurant>
        </h1>
        <i>Some of the best restaurants serving iconic lunches and dinners</i>
      </div>

      {restaurantList.map((cafe, id) => {
        const name = cafe.name
        const address = cafe.formatted_address
        const rating = cafe.rating
        const price = cafe.price_level

        return (
          <FoodRecommendationDetail
            key={id}
            name={name}
            address={address}
            rating={rating}
            price={price}
          ></FoodRecommendationDetail>
        )
      })}
    </div>
  )
}
