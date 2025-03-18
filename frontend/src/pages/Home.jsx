import React, { useContext } from 'react'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/Banner'
import Accordian from '../components/Accordian'
import Testimonials from '../components/Testimonilas'
import { AppContext } from '../context/AppContext'



const Home = () => {
  const {token} = useContext(AppContext);

  return (
    <div>
      <Header />
      <SpecialityMenu />
      <TopDoctors />
      {
        !token ? <Banner /> : <Accordian />
      }
      <Testimonials />
    </div>
  )
}

export default Home