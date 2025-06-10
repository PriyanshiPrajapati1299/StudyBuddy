import React from 'react'
import Hero from '../Components/Hero'
import Features from '../Components/Feature'
import PopularCourses from '../Components/PopularCourses'
import MeetOurMentors from '../Components/MeetOurMentors'
import SuccessStories from '../Components/SuccessStories'
import FAQ from '../Components/FAQ'
import Newsletter from '../Components/Newsletter'
import Footer from '../Components/Footer'


const Home = () => {
  return (
    <div>
        <Hero/>
        <Features/>
        <PopularCourses/>
        <MeetOurMentors/>
        <SuccessStories/>
        <FAQ/>
        <Newsletter/>
        <Footer/>
    </div>
    
  )
}

export default Home