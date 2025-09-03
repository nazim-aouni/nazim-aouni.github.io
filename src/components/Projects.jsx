import React, { useEffect, useState } from "react"
import ProjectCard from "./ProjectCard"
import { Typewriter } from "react-simple-typewriter"
import { supabase } from "../SupabaseClient"
import { FiChevronDown, FiChevronUp } from "react-icons/fi"
import { motion, AnimatePresence } from "framer-motion"
import { useNavigate } from "react-router-dom"

function Projects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAll, setShowAll] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true)

      const { data: projectData, error: projectError } = await supabase
        .from("project")
        .select("*")

      if (projectError) {
        console.error("Error fetching projects:", projectError)
        setLoading(false)
        return
      }

      const { data: toolData, error: toolError } = await supabase
        .from("project_tool")
        .select("project_id, tool(name)")

      if (toolError) console.error("Error fetching tools:", toolError)

      const combined = projectData.map((p) => ({
        ...p,
        image: p.image || "/placeholder.png", 
        technologies:
          toolData
            ?.filter((t) => t.project_id === p.project_id)
            .map((t) => t.tool.name) || [],
      }))

      setProjects(combined)
      setLoading(false)
    }

    fetchProjects()
  }, [])

  const displayedProjects = showAll ? projects : projects.slice(0, 6)

  return (
    <section id="projects" className="py-12 px-4">
      <h2
        className="text-3xl font-extrabold text-center mb-8"
        style={{ color: "#0D47A1" }}
      >
        <Typewriter
          words={["Projects", "My Projects"]}
          loop={0}
          cursor
          cursorStyle="_"
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={1000}
        />
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading projects…</p>
      ) : (
        <>
          <motion.div
            layout
            className="flex flex-wrap justify-center gap-40"
          >
            <AnimatePresence>
              {displayedProjects.map((project) => (
                <motion.div
                  key={project.project_id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="w-120 h-[420px] flex gap-10"
                >
                  <ProjectCard
                    image={project.image} // ✅ now correctly shows head_image
                    title={project.title}
                    role={project.role}
                    description={project.description.slice(0, 115) + ' ...'}
                    technologies={project.technologies}
                    onClick={() => navigate(`/project/${project.project_id}`)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {projects.length > 6 && (
            <div className="flex justify-center mt-8">
              <button
                onClick={() => setShowAll(!showAll)}
                className="flex items-center gap-2 px-6 py-2 rounded-lg bg-blue-900 text-white hover:bg-blue-800 transition"
              >
                {showAll ? (
                  <>
                    Show Less <FiChevronUp />
                  </>
                ) : (
                  <>
                    More Projects <FiChevronDown />
                  </>
                )}
              </button>
            </div>
          )}
        </>
      )}
    </section>
  )
}

export default Projects
