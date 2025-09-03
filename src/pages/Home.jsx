
import React, { useId } from "react";
import NavBar from '../components/navbar'
import Hero from '../components/Hero'
import Projects from '../components/Projects'
import Skills from '../components/Skills' 
import Posts from '../components/Posts' 
import ContactForm from '../components/ContactForm' 
import HomeFooter from '../components/HomeFooter'

// Reusable, elegant navy curve (concave/convex based on "flip")
function SectionDivider({ flip = false, className = "" }) {
  const id = useId();
  const gradId = `navyGrad-${id}`;
  return (
    <div className={`relative h-16 select-none ${className}`} aria-hidden="true">
      <svg
        className="absolute inset-0 w-full h-full text-blue-900"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            {/* top of the shape slightly stronger, fading to transparent */}
            <stop offset="0" stopColor="currentColor" stopOpacity="0.25" />
            <stop offset="1" stopColor="currentColor" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          // Smooth single curve — professional, not wavy
          d={
            flip
              ? "M0,120 L0,0 Q720,120 1440,0 L1440,120 Z"
              : "M0,0 L0,120 Q720,0 1440,120 L1440,0 Z"
          }
          fill={`url(#${gradId})`}
        />
      </svg>
    </div>
  );
}

function Divider3D({ color = "bg-navy-900" }) {
  return (
    <div className="relative w-full h-20 overflow-hidden">
      <div
        className={`absolute inset-0 ${color} transform -skew-y-3 shadow-2xl`}
      />
    </div>
  )
}


function Home() {
  return (
    <>
      <NavBar />
      <Hero />

      {/* Hero → Projects */}
      <SectionDivider />

      <Projects />

      {/* Projects → Skills */}
      <SectionDivider flip />

      <Skills /> 

      {/* Skills → Posts */}
      <SectionDivider />

      <Posts />

      {/* Posts → Contact */}
      <SectionDivider flip />

      <ContactForm />
      <HomeFooter />
    </>
  )
}

export default Home

