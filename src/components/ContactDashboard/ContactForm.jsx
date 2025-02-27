import { useState } from "react";
import emailjs from "emailjs-com";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    email: "",
    message: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Replace these values with your own from the EmailJS dashboard
      const serviceID = "service_zk2dsdd";
      const templateID = "template_lzgx8un";
      const userID = "oT3RgONVLYO3pGAV3";

      const result = await emailjs.send(
        serviceID,
        templateID,
        formData,
        userID
      );
      console.log("Email successfully sent!", result.text);
      alert("Transmission sent!");
      setFormData({ name: "", subject: "", email: "", message: "" });
    } catch (error) {
      console.error("Failed to send email. Error:", error.text);
      alert("Error sending transmission!");
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="bg-black/60 p-5 rounded-lg w-full h-full flex flex-col justify-between">
        <h2 className="text-center text-4xl font-extrabold mb-10">
          Houston, We Have a Contact
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col text-sm">
            Commander’s Name:
            <input
              required
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 p-2 rounded bg-white text-black"
            />
          </label>
          <label className="flex flex-col text-sm">
            Mission Brief:
            <input
              type="text"
              name="subject"
              placeholder="Enter your subject"
              value={formData.subject}
              onChange={handleChange}
              className="mt-1 p-2 rounded bg-white text-black"
            />
          </label>
          <label className="flex flex-col text-sm">
            Contact Frequency (Email):
            <input
              required
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 p-2 rounded bg-white text-black"
            />
          </label>
          <label className="flex flex-col text-sm">
            Transmission Content:
            <textarea
              required
              name="message"
              placeholder="Enter your message"
              value={formData.message}
              onChange={handleChange}
              className="mt-1 p-2 rounded bg-white text-black"
            />
          </label>
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors"
          >
            Send Transmission
          </button>
        </form>
      </div>
    </div>
  );
}
