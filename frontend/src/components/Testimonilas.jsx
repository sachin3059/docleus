import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "John Doe",
    feedback:
      "The doctors here are truly amazing. They provided excellent care and ensured my recovery was smooth. Highly recommended!",
    location: "New York, USA",
    image: "https://randomuser.me/api/portraits/men/10.jpg",
  },
  {
    name: "Sarah Johnson",
    feedback:
      "Very professional staff and a comfortable environment. The telemedicine consultation was smooth and efficient.",
    location: "London, UK",
    image: "https://randomuser.me/api/portraits/women/20.jpg",
  },
  {
    name: "David Brown",
    feedback:
      "Booking an appointment was easy, and the treatment I received was top-notch. Would definitely visit again.",
    location: "Sydney, Australia",
    image: "https://randomuser.me/api/portraits/men/30.jpg",
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide effect every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="max-w-2xl mx-auto text-center py-10 my-20">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">
        What Our Patients Say
      </h2>
      <div className="relative bg-white p-6 shadow-lg rounded-xl">
        <img
          src={testimonials[currentIndex].image}
          alt={testimonials[currentIndex].name}
          className="w-16 h-16 rounded-full mx-auto mb-4"
        />
        <p className="text-gray-600 italic">"{testimonials[currentIndex].feedback}"</p>
        <h4 className="text-lg text-gray-800 mt-3">{testimonials[currentIndex].name}</h4>
        <span className="text-sm text-gray-500">{testimonials[currentIndex].location}</span>

        {/* Navigation Arrows */}
        <button
          onClick={prevTestimonial}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full hover:bg-gray-300"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={nextTestimonial}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full hover:bg-gray-300"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default Testimonials;
