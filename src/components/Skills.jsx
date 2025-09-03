import { 
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaPython, FaJava, FaGitAlt, FaDatabase, FaShieldAlt, FaCuttlefish
} from "react-icons/fa"
import { 
  SiTailwindcss, SiDjango, SiExpress, SiMysql, SiMongodb, SiPostgresql,
  SiPandas, SiNumpy, SiScikitlearn, SiKalilinux, SiWireshark, SiCisco, SiTrello, SiFlask, SiFastapi
} from "react-icons/si"
import { TbApi } from "react-icons/tb"
import { RiCpuLine, RiTerminalBoxFill } from "react-icons/ri"
import { GiTrophyCup } from "react-icons/gi"
import { useState, useRef, useEffect } from "react"
import React from "react"

const skillsData = [
  {
    category: "Programming languages",
    skills: [
      { name: "C", icon: <RiCpuLine className="text-gray-700 w-10 h-10" /> },
      { name: "C++", icon: <FaCuttlefish className="text-blue-900 w-10 h-10" /> },
      { name: "C#", icon: <span className="text-purple-600 text-xl font-bold">C#</span> },
      { name: "Java", icon: <FaJava className="text-red-600 w-10 h-10" /> },
      { name: "Python", icon: <FaPython className="text-blue-400 w-10 h-10" /> },
      { name: "JavaScript", icon: <FaJs className="text-yellow-500 w-10 h-10" /> },
      { name: "Pascal", icon: <span className="text-green-600 text-xl font-bold">P</span> },
      { name: "Assembly", icon: <RiTerminalBoxFill className="text-gray-500 w-10 h-10" /> },
    ],
  },
  {
    category: "Frontend",
    skills: [
      { name: "HTML", icon: <FaHtml5 className="text-orange-600 w-10 h-10" /> },
      { name: "CSS", icon: <FaCss3Alt className="text-blue-900 w-10 h-10" /> },
      { name: "React", icon: <FaReact className="text-blue-400 w-10 h-10" /> },
      { name: "TailwindCSS", icon: <SiTailwindcss className="text-cyan-500 w-10 h-10" /> },
      { name: "Angular", icon: <span className="text-red-500 text-xl font-bold">A</span> },
      { name: "JavaFX", icon: <span className="text-green-600 text-xl font-bold">FX</span> },
      { name: "SceneBuilder", icon: <span className="text-blue-500 text-xl font-bold">SB</span> },
    ],
  },
  {
    category: "Backend & APIs",
    skills: [
      { name: "Express.js", icon: <SiExpress className="text-gray-800 w-10 h-10" /> },
      { name: "Django", icon: <SiDjango className="text-green-700 w-10 h-10" /> },
      { name: "FastAPI", icon: <SiFastapi className="text-teal-600 w-10 h-10" /> },
      { name: "Flask", icon: <SiFlask className="text-gray-700 w-10 h-10" /> },
      { name: "REST APIs", icon: <TbApi className="text-blue-900 w-10 h-10" /> },
    ],
  },
  {
    category: "Databases",
    skills: [
      { name: "MySQL", icon: <SiMysql className="text-blue-900 w-10 h-10" /> },
      { name: "PostgreSQL", icon: <SiPostgresql className="text-blue-900 w-10 h-10" /> },
      { name: "MongoDB", icon: <SiMongodb className="text-green-500 w-10 h-10" /> },
      { name: "SQL", icon: <FaDatabase className="text-gray-600 w-10 h-10" /> },
    ],
  },
  {
    category: "AI / ML",
    skills: [
      { name: "NumPy", icon: <SiNumpy className="text-blue-900 w-10 h-10" /> },
      { name: "Pandas", icon: <SiPandas className="text-black w-10 h-10" /> },
      { name: "scikit-learn", icon: <SiScikitlearn className="text-orange-500 w-10 h-10" /> },
      { name: "TF-IDF", icon: <span className="text-purple-600 text-xl font-bold">TF</span> },
      { name: "NLP", icon: <span className="text-pink-500 text-xl font-bold">NLP</span> },
    ],
  },
  {
    category: "Cybersecurity",
    skills: [
      { name: "OWASP", icon: <FaShieldAlt className="text-red-600 w-10 h-10" /> },
      { name: "CTFs", icon: <GiTrophyCup className="text-yellow-500 w-10 h-10" /> },
      { name: "Kali Linux", icon: <SiKalilinux className="text-pink-600 w-10 h-10" /> },
      { name: "Burp Suite", icon: <span className="text-orange-500 text-xl font-bold">B</span> },
      { name: "Wireshark", icon: <SiWireshark className="text-cyan-600 w-10 h-10" /> },
      { name: "Cisco IOS", icon: <SiCisco className="text-blue-900 w-10 h-10" /> },
    ],
  },
  {
    category: "Tools",
    skills: [
      { name: "Git", icon: <FaGitAlt className="text-red-600 w-10 h-10" /> },
      { name: "Linux", icon: <RiTerminalBoxFill className="text-gray-700 w-10 h-10" /> },
      { name: "Microsoft Project", icon: <span className="text-green-600 text-xl font-bold">MS</span> },
      { name: "Trello", icon: <SiTrello className="text-blue-900 w-10 h-10" /> },
    ],
  },
]

function Skills() {
  const [activeTab, setActiveTab] = useState(0)
  const tabRefs = useRef([]) 
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0 })

  useEffect(() => {
    if (tabRefs.current[activeTab]) {
      const el = tabRefs.current[activeTab]
      setIndicatorStyle({
        width: el.offsetWidth,
        left: el.offsetLeft,
      })
    }
  }, [activeTab])

  return (
    <section id="skills" className="py-16 px-6 max-w-6xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-4xl bg-gradient-to-r from-blue-900 to-gray-800 bg-clip-text text-transparent font-extrabold">
          Skills
        </h2>
        <p className="text-gray-500 mt-2">Technologies & tools I work with</p>
      </div>

      {/* Tabs */}
      <div className="relative flex justify-center mb-8 border-b border-gray-300 flex-wrap">
        {skillsData.map((tab, idx) => (
          <button
            key={tab.category}
            ref={(el) => (tabRefs.current[idx] = el)}
            className={`relative px-6 py-3 font-semibold transition-all duration-200 rounded-md
              ${activeTab === idx 
                ? "text-blue-900 bg-blue-100 scale-105 lg:bg-inherit" 
                : "text-gray-600 hover:text-blue-900 hover:bg-gray-100"
              }`}
            onClick={() => setActiveTab(idx)}
          >
            {tab.category}
          </button>
        ))}

        {/* Sliding underline */}
        <span
          className="hidden md:block absolute bottom-0 h-1 bg-blue-900 transition-all duration-300 ease-in-out "
          style={{ width: indicatorStyle.width, left: indicatorStyle.left }}
        />
      </div>

      {/* Skills grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-10 justify-items-center">
        {skillsData[activeTab].skills.map((skill, idx) => (
          <div
            key={idx}
            className="group flex flex-col items-center space-y-2 p-4 rounded-xl 
                       bg-gradient-to-r from-slate-100 via-white to-slate-100 backdrop-blur-sm shadow-sm 
                       hover:shadow-lg hover:-translate-y-1 
                       transition transform duration-300"
          >
            {skill.icon && React.cloneElement(skill.icon, {
              className: skill.icon.props.className + " transition-transform duration-300 group-hover:scale-110"
            })}
            <span className="text-sm font-medium">{skill.name}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Skills
