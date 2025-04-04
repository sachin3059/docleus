import React, { useContext } from 'react'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import TopDoctors from '../components/TopDoctors'
import Accordian from '../components/Accordian'
import Testimonials from '../components/Testimonilas'



const Home = () => {
 
  return (
    <div>
      <Header />
      <SpecialityMenu />
      <TopDoctors />
      <Accordian />
      <Testimonials />
    </div>
  )
}

export default Home