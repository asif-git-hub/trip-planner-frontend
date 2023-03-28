import React from "react"

export function Contact() {
  const email = "adventurebitesize@gmail.com"

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
    </div>
  )
}
