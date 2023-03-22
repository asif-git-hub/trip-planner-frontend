import React, { useRef, useState } from "react"
import { MyForm } from "../components/Form"
import { Header } from "../components/Header"
import { Loading } from "../components/Loading"
import { ResponseBox } from "../components/ResponseBox"
import { TechnicalError } from "./Error"
import { ResponseMenu } from "../components/ResponseMenu"

export function Home() {
  const [loading, setLoading] = useState(false)
  const [errored, setErrored] = useState(false)

  // data to be sent
  const [data, setData] = useState({
    destination: "",
    days: "",
    includeCafes: false,
    includeRestaurants: false,
    includeMuseums: false,
  })

  const [itinerary, setItinerary] = useState("")
  const [containerToDisplay, setContainerToDisplay] =
    useState("itinerary-button")

  const responseBoxRef = useRef<HTMLInputElement>(null)

  if (errored) {
    return <TechnicalError></TechnicalError>
  }

  if (!loading) {
    if (!itinerary) {
      return (
        <div className="home">
          <Header></Header>

          <MyForm
            data={data}
            setData={setData}
            setLoading={setLoading}
            setResponse={setItinerary}
            setErrored={setErrored}
          ></MyForm>
        </div>
      )
    } else {
      return (
        <div className="response-window" ref={responseBoxRef}>

          <ResponseMenu
            containerToDisplay={containerToDisplay}
            setContainerToDisplay={setContainerToDisplay}
          ></ResponseMenu>
          
          <ResponseBox
            containerToDisplay={containerToDisplay}
            response={itinerary}
          ></ResponseBox>

        </div>
      )
    }
  } else {
    return (
      <div>
        <Loading destination={data.destination}></Loading>
      </div>
    )
  }
}
