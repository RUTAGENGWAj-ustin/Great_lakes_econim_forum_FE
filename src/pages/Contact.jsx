import React, { useState } from "react";
import axios from "axios";
import {  FacebookIcon, InstagramIcon, LinkedinIcon, TwitterIcon } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      const response = await axios.post("http://localhost:5000/send-email", formData);
      setMessage(response.data);
    } catch (error) {
      setMessage("Error sending email. Please try again.");
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="  bg-white min-h-screen mt-30">
      <div className=" grid w-full flex justify-center items-center mb-10">
        <div className="w-fit">
          <h1 className="text-4xl text-center text-green-900 font-semibold">
            <span className="text-green-600 text-4xl">Contact Us</span>
          </h1>
        </div>
      </div>

      {/* Contact Form and Address Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 bg-white">
        {/* Left Side: Contact Form */}
        <div className="bg-gray-50 p-6 rounded-lg ">
          <h2 className="text-xl font-semibold mb-4">Send Us a Message</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="name">
                Name
              </label>
              <input
                 type="text"
                 id="name"
                 name="name"
                 value={formData.name}
                 onChange={handleChange}
                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                 placeholder="Your Name"
                 required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="email">
                Email
              </label>
              <input
                 type="email"
                 id="email"
                 name="email"
                 value={formData.email}
                 onChange={handleChange}
                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                 placeholder="Your Email"
                 required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="message">
                Message
              </label>
              <textarea
               id="message"
               name="message"
               value={formData.message}
               onChange={handleChange}
               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
               rows="5"
               placeholder="Your Message"
               required
              ></textarea>
            </div>
            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors duration-300"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
          {message && <p className="mt-4 text-center text-gray-700">{message}</p>}
        </div>

        {/* Right Side: Address and Social Media Links */}
        <div className="bg-gray-50 p-6 rounded-lg ">
          <h2 className="text-xl font-semibold mb-4">Our Information</h2>
          <div className="space-y-4">
            <p className="text-gray-700">
              <span className="font-semibold">Opening Hours:</span> 09:00 – 18:00 on weekdays
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Address:</span> Walking Street, Los Angeles, California, USA
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Email:</span> info@eventchamp.com
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Phone:</span> +90 312 69 12 | +55 215 70 20
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700"
              >
    
               <FacebookIcon/>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-600"
              >
                 <TwitterIcon/>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-500 hover:text-pink-700"
              >
                <i className="fab fa-instagram text-2xl"></i>
                <InstagramIcon className="text-2xl"/>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:text-blue-900"
              >
                <i className="fab fa-linkedin text-2xl"></i>
                <LinkedinIcon className="text-2xl"/>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom: Map */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Our Location</h2>
        <div className="w-full h-64 rounded-lg overflow-hidden">
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3304.016712096093!2d-118.2436832847841!3d34.05223518060045!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c6350a4f1f3b%3A0x4a4b8b0f8a5b5b5b!2sWalking%20Street%2C%20Los%20Angeles%2C%20CA%2C%20USA!5e0!3m2!1sen!2s!4v1633025000000!5m2!1sen!2s"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;