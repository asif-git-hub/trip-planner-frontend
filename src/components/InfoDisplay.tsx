import React from "react"
import { useGlobalContext } from "../context"
import { UnsplashCredit } from "./UnsplashCredit"
import {HiOutlineInformationCircle} from "react-icons/hi"
import { IoPeopleCircleOutline } from "react-icons/io5"
import { FaMapSigns, FaMoneyCheckAlt, FaRegGrinStars } from "react-icons/fa"
import { TiWeatherPartlySunny } from "react-icons/ti"
import { TbAlertTriangleFilled } from "react-icons/tb"
import { BiCalendarEvent } from "react-icons/bi"
import { MdOutlineCelebration } from "react-icons/md"

export function InfoDisplay() {
  const { destinationInfo, itineraryRequest, itineraryPagePhoto } =
    useGlobalContext()

  const destination = itineraryRequest.destination.split(",")[0]

  return (
    <div className="info-display-container">
      <div className="day-container">
      <HiOutlineInformationCircle className="info-icon"></HiOutlineInformationCircle>
      <h5>Get to know {destination}</h5>
      </div>
      <p>{destinationInfo?.introduction}</p>

      {itineraryPagePhoto && itineraryPagePhoto[1] ? (
        <div>
          <img
            src={itineraryPagePhoto[1].photo.url}
            className="info-img"
            alt={itineraryPagePhoto[1].photo.alt}
          />
          <UnsplashCredit
            image={itineraryPagePhoto[1].photo.url}
            profile={itineraryPagePhoto[1].photographer.profile}
            photographer={itineraryPagePhoto[1].photographer.name}
          ></UnsplashCredit>
        </div>
      ) : (
        ""
      )}

      <div className="activity-container">
        <MdOutlineCelebration className="info-icon"></MdOutlineCelebration>
        <h5>{destination}'s culture and customs</h5>
      </div>
      <p>{destinationInfo?.culture_and_customs}</p>

      <div className="day-container">
        <IoPeopleCircleOutline className="info-icon"></IoPeopleCircleOutline>
        <h5>Learn to talk like the locals</h5>
      </div>
      <p>{destinationInfo?.languages_and_communications}</p>

      <div className="activity-container">
        <FaRegGrinStars className="info-icon"></FaRegGrinStars>
        <h5>What is {destination} famous for</h5>
      </div>
      <p>{destinationInfo?.famous_for}</p>

      {itineraryPagePhoto && itineraryPagePhoto[2] ? (
        <div>
          <img
            src={itineraryPagePhoto[2].photo.url}
            className="info-img"
            alt={itineraryPagePhoto[2].photo.alt}
          />
          <UnsplashCredit
            image={itineraryPagePhoto[2].photo.url}
            profile={itineraryPagePhoto[2].photographer.profile}
            photographer={itineraryPagePhoto[2].photographer.name}
          ></UnsplashCredit>
        </div>
      ) : (
        ""
      )}

      <div className="activity-container">
        <BiCalendarEvent className="info-icon"></BiCalendarEvent>
        <h5>Prepare for local events</h5>
      </div>
      <p>{destinationInfo?.local_events}</p>

      <div className="activity-container">
        <FaMoneyCheckAlt className="info-icon"></FaMoneyCheckAlt>
        <h5>Local currency</h5>
      </div>
      <p>{destinationInfo?.currencies}</p>

      <div className="activity-container">
        <FaMapSigns className="info-icon"></FaMapSigns>
        <h5>Getting around</h5>
      </div>
      <p>{destinationInfo?.transportation}</p>

      <div className="day-container">
        <TiWeatherPartlySunny className="info-icon"></TiWeatherPartlySunny>
        <h5>Weather</h5>
      </div>
      <p>{destinationInfo?.climate_and_weather}</p>

      <div className="content-container-red">
        <TbAlertTriangleFilled className="info-icon"></TbAlertTriangleFilled>
        <h5>Keep an eye out</h5>
      </div>
      <p>{destinationInfo?.saftey_and_security}</p>
    </div>
  )
}
