import React from "react";

export function Contact() {

    const email = "adventurebitesize@gmail.com"
    return (
        <div className="contact">
            <br></br>
            <h3>Contact form coming soon</h3>
            <p>In the meantime, reach out to us on <a href={`mailto:${email}`}>{email}</a> </p> 
        </div>
    )
}