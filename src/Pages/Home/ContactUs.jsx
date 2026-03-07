import React, { useState } from "react";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from "react-icons/fa";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });

    alert("Thank you for your message!");
  };

  return (
    <section className="py-20 bg-gray-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4">

        {/* Title */}
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-3">
            Get In Touch
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            Have questions or need support? Our team is here to help you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">

          {/* Contact Info */}
          <div className="space-y-6">

            <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-6 shadow-md">
              <div className="flex items-start gap-4">
                <FaMapMarkerAlt className="text-primary text-xl mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-white">
                    Address
                  </h4>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    123 Freelance Street<br />Tech City
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-6 shadow-md">
              <div className="flex items-start gap-4">
                <FaPhone className="text-primary text-xl mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-white">
                    Phone
                  </h4>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    +1 (555) 123-4567
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-6 shadow-md">
              <div className="flex items-start gap-4">
                <FaEnvelope className="text-primary text-xl mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-white">
                    Email
                  </h4>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    support@halalkaj.com
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-6 shadow-md">
              <div className="flex items-start gap-4">
                <FaClock className="text-primary text-xl mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-white">
                    Business Hours
                  </h4>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    Mon-Fri: 9AM-6PM<br />Sat-Sun: 10AM-4PM
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Contact Form */}
          <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl shadow-md p-8">

            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
              Send us a Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">

              <div className="grid md:grid-cols-2 gap-4">

                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="input input-bordered w-full"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="input input-bordered w-full"
                />

              </div>

              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="input input-bordered w-full"
              />

              <textarea
                name="message"
                rows="5"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
                className="textarea textarea-bordered w-full resize-none"
              ></textarea>

              <button
                type="submit"
                className="btn btn-primary w-full rounded-full"
              >
                Send Message
              </button>

            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactUs;