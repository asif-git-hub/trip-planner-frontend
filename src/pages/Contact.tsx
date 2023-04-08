import React from "react"
import { ServoiceFeedback } from 'react-feedback-widget';

export function Contact() {
  const email = "adventurebitesize@gmail.com"

  const feedbackConfig = {
    servId: 'clg7m2b31000708mk23gwisor',
    servPID: 'clg7m2b31000808mk5evbjm3r',
  };

  return (
    <div className="contact">
      <br></br>
      <br></br>
      <p>
        We are dedicated to providing you with a comprehensive travel planning
        experience, serving as your one-stop-shop for all your travel needs. If
        you have any feedbacks, we would be delighted to hear from you.
        <br></br>
        <i>{email}</i>
      </p>
      <ServoiceFeedback config={feedbackConfig}>
      <button type="button">Feedback?</button>
      </ServoiceFeedback>
    </div>
  )
}
