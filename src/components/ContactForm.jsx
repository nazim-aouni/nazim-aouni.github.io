import { useState } from "react";
import { FiSend, FiCheckCircle, FiLoader } from "react-icons/fi";
import { supabase } from "../SupabaseClient"; // make sure you import your Supabase client

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("idle");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const { data, error } = await supabase.from("message").insert([
        {
          content: formData.message,
          contact: `${formData.name} <${formData.email}>`,
          date: new Date().toISOString().split("T")[0], 
        },
      ]);

      if (error) throw error;

      setStatus("success");
      setFormData({ name: "", email: "", message: "" }); // reset form
    } catch (err) {
      console.error("Error sending message:", err);
      setStatus("idle");
      alert("Failed to send message. Please try again.");
    }
  };

  return (
    <section id="contact" className="py-20 px-6 max-w-4xl mx-auto">
      {/* Heading with icon + underline */}
      <div className="text-center mb-12">
        <div className="flex justify-center items-center gap-3 mb-4">
          <div className="p-3 bg-blue-100 rounded-full shadow-sm">
            <FiSend className="w-6 h-6 text-blue-600" />
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            <span className="text-blue-800">Contact</span>{" "}
            <span className="text-gray-900">Me</span>
          </h2>
        </div>

        <p className="mt-4 text-gray-600 text-lg max-w-2xl mx-auto">
          I’d like to hear from you. Fill out the form below and I’ll get back to
          you soon.
        </p>
      </div>

      {status === "success" ? (
        <div className="bg-green-50 text-green-700 p-6 rounded-xl text-center shadow-md font-medium flex items-center justify-center gap-2 animate-fade-in">
          <FiCheckCircle className="w-5 h-5" />
          Thank you for reaching out
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-10 space-y-8 border border-gray-100 transition-transform duration-300 hover:shadow-xl"
        >
          {/* Name & Email side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition shadow-sm"
                placeholder="Your name"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition shadow-sm"
                placeholder="your@email.com"
              />
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Message
            </label>
            <textarea
              name="message"
              rows="6"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition shadow-sm"
              placeholder="Write your message..."
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={status === "sending"}
            className={`w-full md:w-auto flex items-center justify-center gap-2 font-semibold px-8 py-3 rounded-xl shadow 
            transition transform hover:-translate-y-0.5 ${
              status === "sending"
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "mr-auto bg-gradient-to-r from-blue-800 to-blue-800 text-white hover:opacity-90 hover:shadow-md"
            }`}
          >
            {status === "sending" ? (
              <>
                <FiLoader className="w-5 h-5 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <FiSend className="w-5 h-5" />
                Send Message
              </>
            )}
          </button>
        </form>
      )}
    </section>
  );
}

export default ContactForm;
