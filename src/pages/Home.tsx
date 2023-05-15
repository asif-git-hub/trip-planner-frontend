import React from "react"
import { MyForm } from "../components/Form"
import { Header } from "../components/Header"
import homeImg from "../assets/great-ocean-road.png"
import { PresetTrips } from "../components/PresetTrips"

export function Home() {

  return (
    <div className="home">
      <div className="block img-background">
        <img
          src={homeImg}
          className="background-img"
          alt="great ocean road in Melbourne Australia"
        />
      </div>
      <div className="block">
        <div className="content-container">
          <Header
            heading="Travel Planner"
            description="Explore the world at the speed of thought"
          ></Header>

          <MyForm></MyForm>

          <PresetTrips></PresetTrips>
        </div>
      </div>
    </div>
  )
}
