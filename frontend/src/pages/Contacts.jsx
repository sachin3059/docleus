import React, { useState, useContext } from 'react';
import { assets } from '../assets/assets_frontend/assets';
import axios from 'axios';
import { AppContext } from '../context/AppContext';

const Contacts = () => {
  const { backendUrl } = useContext(AppContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(backendUrl + '/api/user/contact', formData);
      setStatus({ type: 'success', message: 'Message sent successfully!' });
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setStatus({ type: 'error', message: 'Failed to send message.' });
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-center text-4xl font-bold text-gray-800 mb-6">CONTACT <span className="text-gray-600">US</span></h2>

      <div className="my-10 flex flex-col md:flex-row gap-10 mb-28">
        <img className="w-full md:max-w-lg rounded-lg shadow-lg" src={assets.contact_image} alt="Contact Us" />

        <div className="flex flex-col justify-center items-start gap-6 w-full md:w-1/2 bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-semibold text-2xl text-gray-800">OUR OFFICE</h3>
          <p className="text-gray-600">212206 Pragraj, UttarPradesh, India</p>
          <p className="text-gray-600">Tel: (215) 555-2321 <br /> Email: docleus@gmail.com</p>
          <h4 className="font-semibold text-lg text-gray-800">Careers at DocCare+</h4>
          <p className="text-gray-600">Learn more about our teams and job openings.</p>
          <button className="border border-black px-8 py-2 text-sm hover:bg-black hover:text-white transition-all duration-300 rounded-md">Explore Jobs</button>
        </div>
      </div>

      <div className="bg-gray-100 p-8 rounded-lg shadow-md w-full md:max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-lg p-4 text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-300"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-lg p-4 text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-300"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-lg p-4 text-gray-600 h-32 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-300"
          />
          <button type="submit" className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition duration-300">Send Message</button>
          {status && (
            <p className={`mt-2 text-sm ${status.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>
              {status.message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Contacts;
