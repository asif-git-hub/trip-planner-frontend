import React, { useState } from "react"
import { MyForm } from "../components/Form"
import { Header } from "../components/Header"
import { ItineraryRequestType } from "../types/request.types"
import homeImg from "../assets/great-ocean-road.png"
import { PresetTrips } from "../components/PresetTrips"

export function Home() {
  // data to be sent
  const [data, setData] = useState<ItineraryRequestType>({
    destination: "",
    days: "",
  })

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

          <MyForm data={data} setData={setData}></MyForm>

          <PresetTrips setData={setData}></PresetTrips>
        </div>
      </div>
    </div>
  )
}
