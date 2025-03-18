import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const Accordion = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqData = [
    {
      title: "What services do you offer?",
      content:
        "We provide general consultations, diagnostic services, specialized treatments, and emergency care.",
    },
    {
      title: "How can I book an appointment?",
      content:
        "Appointments can be booked online through our website or by calling our reception desk at +1 234 567 890.",
    },
    {
      title: "Do you offer telemedicine consultations?",
      content:
        "Yes, we offer video consultations with our doctors for non-emergency cases.",
    },
    {
      title: "What are your hospital’s visiting hours?",
      content:
        "Our visiting hours are from 9:00 AM to 7:00 PM daily, except on Sundays.",
    },
    {
      title: "Do you accept health insurance?",
      content:
        "Yes, we accept most major health insurance plans. Please contact our billing department for details.",
    },
  ];

  return (
    <div className="max-w-full mx-10 px-6 py-10">
      {/* Header */}
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        Frequently Asked Questions
      </h2>
      <p className="text-center text-gray-600 mb-8">
        Find answers to common queries about our healthcare services.
      </p>

      {/* Accordion */}
      <div className="space-y-4">
        {faqData.map((item, index) => (
          <div key={index} className="border rounded-sm shadow-md overflow-hidden">
            <button
              className="w-full flex justify-between items-center p-4 bg-gray-100 hover:bg-gray-200 transition-all"
              onClick={() => toggleAccordion(index)}
            >
              <span className="text-base text-gray-700">{item.title}</span>
              <ChevronDown
                className={`transform transition-transform duration-200 ${
                  openIndex === index ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>
            {openIndex === index && (
              <div className="p-4 text-gray-600 bg-white border-t">
                {item.content}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Accordion;
