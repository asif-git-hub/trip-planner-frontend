import React from "react"

type FoodRecommendationTilePropType = {
  name: string | undefined
  address: string | undefined
  rating: number | undefined
  price: number | undefined
}
export function FoodRecommendationDetail({
  name,
  address,
  rating,
  price,
}: FoodRecommendationTilePropType) {
  return (
    <div className="cafe-recommendation-container">
      <p>
        <strong>{name}</strong>
      </p>
      <p>{address}</p>
      {price ? <p>{"$".repeat(price)}</p> : ""}
    </div>
  )
}
