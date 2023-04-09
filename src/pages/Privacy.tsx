import React from "react"
import { Header } from "../components/Header"

export function Privacy() {
  return (
    <div className="privacy">
      <div className="block img-background"></div>
      <div className="block">
        <div className="content-container">
          <Header heading="Privacy Policy"></Header>

          <div className="content-section">
            <p>
              At enchantrek, we value your privacy and are committed to
              protecting your personal information.
              <br></br>
              This Privacy Policy outlines the types of information we collect,
              how we use and protect it, and your rights regarding your personal
              information.
              <br></br>
              Information we collect: Personal information: We collect personal
              information such as your name, email address, and phone number
              when you create an account, contact us, or make a reservation
              through our website. Travel information: We collect travel
              information such as your destination, travel dates, and preferred
              accommodations when you use our website to plan your trip. Website
              usage information: We collect information about how you use our
              website, such as your IP address, browser type, and device
              information. How we use your information:
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
