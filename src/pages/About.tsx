import React from "react";
import { Link } from 'react-router-dom';

export const About = () => {
    return (
      <section className='section' id='about'>
        <div className='section-title'>
        <h2>
            Hello, fellow travel enthusiasts!
        </h2>
        </div>  
        <div className='about-section'>
          <div className='about-img'>
            {/* <img src={aboutImg} className='about-photo' alt='awesome beach' /> */}
          </div>
          <article className='about-text'>
            <p>
                I am delighted to introduce our new travel planner!
                <br />
                <br />
                As passionate travellers ourselves, we understand that visiting a new city can be both exciting and overwhelming. <br />
                With so many sights to see, restaurants to try, and experiences to have, it's easy to feel lost in the planning process. <br />
                <br />
                That's why we've developed a travel planner that streamlines the entire process, allowing you to enjoy your trip without any stress. <br />
                Our user-friendly app generates a personalized itinerary based on your destination and the length of your stay. <br />
                It includes must-see attractions, hidden gems, top-rated restaurants, and local events - everything you need to make your trip unforgettable.<br />
                <br />
                As travel enthusiasts ourselves, we believe everyone should have access to the best travel planning tools available. 
                That's why our app is entirely free of charge.
                <br />
                So, why wait? Start planning your next adventure with our travel planner and create memories that will last a lifetime!
            </p>
          </article>
        </div>
        <Link to="/">
            <button className="btn">
                Back to Planning
            </button>
              
        </Link>
      </section>
    );
  };