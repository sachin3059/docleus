import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const About = () => {
  return (
    <div>

      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>ABOUT <span className='text-gray-700 font-medium'>US</span></p>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-12'>
        <img className='w-full md:max-w-[360px]' src={assets.about_image} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'>
          <p>Welcome to [Your Website Name], your trusted partner in health and wellness. Our mission is to make healthcare accessible and convenient for everyone, by connecting patients with the best medical professionals in a seamless and efficient way.</p>
          <b className='text-gray-800'>Who We Are</b>
          <p>At [Your Website Name], we are a team of dedicated professionals with a passion for transforming healthcare through technology. Our platform is designed to bridge the gap between patients and doctors, making it easy to book appointments, access medical advice, and receive quality healthcare—all from the comfort of your home.</p>
          <b className='text-gray-800'>Our Vision</b>
          <p>Our vision is to create a world where quality healthcare is available to everyone at their fingertips. We want to empower patients by providing them with easy access to experienced doctors and specialists across a wide range of medical fields.</p>
        </div>
      </div>

      <div className='text-xl my-4'>
        <p>WHY <span className='text-gray-700 font-semibold'>CHOOSE US</span> </p>
      </div>

      <div className='flex flex-col md:flex-row mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer'>
          <b>Efficiency:</b>
          <p>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer'>
          <b>Convenience:</b>
          <p>Access to a network of trusted healthcare professionals in your area</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer'>
          <b>Personalization</b>
          <p>Tailored recommendations and reminders to help you stay on top of your health.</p>
        </div>
      </div>
    </div>
  )
}


export default About
