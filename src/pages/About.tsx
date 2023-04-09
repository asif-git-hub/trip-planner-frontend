import React from "react"
import { Link } from "react-router-dom"
import aboutImg from "../assets/bird-kite.png"
import { Header } from "../components/Header"

export const About = () => {
  return (
    <section className="section" id="about">
      <div className="block img-background">
        <img
          src={aboutImg}
          className="background-img"
          alt="A kite flying over the blue skies in Chittagong, Bangladesh"
        />
      </div>
      <div className="block">
        <div className="content-container">
          <Header
            heading="Our Purpose"
            description="We aim to make travel planning simple, instant and affordable"
          ></Header>

          <div className="content-section">
            <article className="about-text">
              <p>
                <i>Looking for an efficient way to plan your next trip?</i>
                <br></br>
                <br></br>
                Look no further than our automatic travel planner app! Our app
                is a simple, instant and automatic travel itinerary creator
                designed for destinations all around the world. Whether you're
                planning a romantic getaway or a family vacation, our app can
                help you create the perfect itinerary in just a few clicks. Say
                goodbye to hours of research and planning, and hello to a
                stress-free and enjoyable travel experience.
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
        </div>
      </div>
      <Link to="/">
        <button className="btn">Start Planning</button>
      </Link>
    </section>
  )
}
