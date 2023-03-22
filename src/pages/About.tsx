import React from "react"
import { Link } from "react-router-dom"
import aboutImg from "../assets/about.png"

export const About = () => {
  return (
    <section className="section" id="about">
      <div className="section-title">
        <h2>Hello, fellow travel enthusiasts!</h2>
      </div>
      <div className="about-img">
        <img
          src={aboutImg}
          className="about-photo"
          alt="popular travel spots in Europe"
        />
      </div>
      <div className="about-section">
        <article className="about-text">
          <p>
            Looking for an efficient way to plan your next trip?
            <br></br>
            Look no further than our automatic travel planner app! Our app is a
            simple, instant and automatic travel itinerary creator designed for
            destinations all around the world. Whether you're planning a
            romantic getaway or a family vacation, our app can help you create
            the perfect itinerary in just a few clicks.
            <br></br>
            <br></br>
            With our app, you can easily explore top-rated attractions,
            restaurants, and hotels at your destination. Our intelligent
            algorithm analyzes your preferences and suggests personalized
            recommendations based on your interests and budget. Say goodbye to
            hours of research and planning, and hello to a stress-free and
            enjoyable travel experience.
            <br></br>
            Our travel planner app is designed to optimize your itinerary based
            on your preferred travel style and time constraints.
            <br></br>
            <br></br>
            With our app, you can be rest assured that your trip will be
            well-planned and hassle-free. Start using our automatic travel
            planner app today to create the perfect itinerary for your next
            adventure.
            <br></br>
            <br></br>
          </p>
        </article>
      </div>
      <Link to="/">
        <button className="btn">Back to Planning</button>
      </Link>
    </section>
  )
}
