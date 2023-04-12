import React from "react"
import { ServoiceFeedback } from "react-feedback-widget"
import aboutImg from "../assets/bird-kite.png"
import { Header } from "../components/Header"
import { getEnvVar } from "../utils/common.utils"

export function Contact() {
  const feedbackConfig = {
    servId: getEnvVar("REACT_APP_SERVID"),
    servPID: "clg7m2b31000808mk5evbjm3r",
  }

  return (
    <div>
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
            heading="Contact us"
            description="We would love your feedback"
          ></Header>

          <div className="content-section">
            <p>
              We are dedicated to providing you with a comprehensive travel
              planning experience, serving as your one-stop-shop for all your
              travel needs. We are constantly improving. If you have any
              feedbacks, we would be delighted to hear from you.
              <br></br>
            </p>
            <div className="feedback-container">
              <ServoiceFeedback config={feedbackConfig}>
                <button type="button" className="btn">
                  Give Feedback
                </button>
              </ServoiceFeedback>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
