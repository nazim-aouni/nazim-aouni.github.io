import { FaLinkedin, FaGithub, FaInstagram, FaEnvelope } from "react-icons/fa";
import profilePic from "../assets/mypic.png";
import "../App.css";

function Hero() {
  return (
    <section
      id="home"
      className="relative w-full max-w-6xl mx-auto mt-16 px-6 flex justify-center"
    >
      {/* Perspective wrapper (true 3D space) */}
      <div
        className="relative"
        style={{ perspective: "1500px" }}
      >
        {/* 3D Card */}
        <div
          className="bg-gradient-to-b from-white to-slate-100 rounded-2xl shadow-2xl px-10 py-16 flex flex-col md:flex-row items-center gap-12 
                     transition-transform duration-700 hover:-translate-y-4 hover:rotate-x-2 hover:rotate-y-2"
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {/* Profile Image */}
          <div className="flex-shrink-0" style={{ transform: "translateZ(40px)" }}>
            <img
              src={profilePic}
              alt="Nazim Aouni"
              className="w-56 h-56 md:w-64 md:h-64 rounded-full object-cover border-4 border-blue-900 shadow-xl 
                         grayscale hover:grayscale-0 hover:scale-105 transition duration-500"
            />
          </div>

          {/* Text Content */}
          <div className="max-w-xl text-center md:text-left" style={{ transform: "translateZ(30px)" }}>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3">
              <span className="bg-gradient-to-r from-blue-900 to-gray-800 bg-clip-text text-transparent">
                Nazim A. Aouni
              </span>
            </h1>
            <h2 className="text-gray-600 italic text-lg md:text-xl mb-6">
              Computer Science Engineer
            </h2>

            <p className="text-gray-700 leading-relaxed mb-4">
              An enthusiastic Computer Science engineer , keen on AI and software engineering, with a solid background in cybersecurity. Eager to learn, grow, and contribute to both new and ongoing projects.
            </p>

            <p className="text-sm text-gray-500 mb-8">
              Building real-world projects and navigating the knowledge economy.

            </p>

            {/* Social Icons */}
            <div className="flex justify-center md:justify-start gap-8 text-2xl text-gray-600">
              <a
                href="https://www.linkedin.com/in/nazim-aouni-3bb211332/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-blue-900 transition-colors"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://github.com/nazim-aouni"
                target="_blank"
                rel="noreferrer"
                className="hover:text-black transition-colors"
              >
                <FaGithub />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-pink-500 transition-colors"
              >
                <FaInstagram />
              </a>
              <a
                href="mailto:mn_aouni@esi.de"
                className="hover:text-red-500 transition-colors"
              >
                <FaEnvelope />
              </a>
            </div>
          </div>
        </div>

        {/* Ground Shadow (makes it "stand") */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-6 bg-blue-900/20 blur-2xl rounded-full"></div>
      </div>
    </section>
  );
}

export default Hero;
