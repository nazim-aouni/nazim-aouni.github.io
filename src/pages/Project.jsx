import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import {
  FiChevronLeft,
  FiChevronRight,
  FiExternalLink,
  FiGithub,
  FiBriefcase,
  FiCalendar,
  FiTool,
  FiCheckCircle,
} from "react-icons/fi"
import { motion, AnimatePresence } from "framer-motion"
import { supabase } from "../SupabaseClient"

function Project() {
  const { id } = useParams()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [current, setCurrent] = useState(0)
  const [activeTab, setActiveTab] = useState("gallery")

  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true)

      // 1. Fetch project details
      const { data: projectData, error: projectError } = await supabase
        .from("project")
        .select("*")
        .eq("project_id", id)
        .single()

      if (projectError) {
        console.error("Error fetching project:", projectError)
        setLoading(false)
        return
      }

      // 2. Fetch related images
      const { data: imageData, error: imageError } = await supabase
        .from("project_images")
        .select("image")
        .eq("project_id", id)

      if (imageError) {
        console.error("Error fetching images:", imageError)
      }

      // 3. Fetch tech stack via join
      const { data: toolData, error: toolError } = await supabase
        .from("project_tool")
        .select("tool(name)")
        .eq("project_id", id)

      if (toolError) {
        console.error("Error fetching tech stack:", toolError)
      }

      // 4. Fetch features
      const { data: featureData, error: featureError } = await supabase
        .from("project_features")
        .select("feature")
        .eq("project_id", id)

      if (featureError) {
        console.error("Error fetching features:", featureError)
      }

      // 5. Build project object
      setProject({
        ...projectData,
        images: imageData ? imageData.map((img) => img.image) : [],
        tech: toolData ? toolData.map((t) => t.tool.name) : [],
        features: featureData ? featureData.map((f) => f.feature) : [],
      })

      setLoading(false)
    }

    fetchProject()
  }, [id])

  const total = project?.images?.length || 0
  const nextSlide = () => setCurrent((prev) => (prev + 1) % total)
  const prevSlide = () => setCurrent((prev) => (prev - 1 + total) % total)

  if (loading) {
    return <div className="text-center py-20">Loading project…</div>
  }

  if (!project) {
    return <div className="text-center py-20 text-red-600">Project not found</div>
  }

  // Format the project period
  const formatDate = (date) =>
    date ? new Date(date).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : "Present"
  const period = `${formatDate(project.start_date)} - ${formatDate(project.end_date)}`

  return (
    <div className="relative px-6 py-10 md:px-16 max-w-6xl mx-auto text-gray-900 from-white to-slate-100">
      {/* Header */}
      <header className="text-center mb-12">
        <div className="inline-flex items-center gap-2 text-blue-900 font-medium tracking-wide uppercase text-xs">
          <span className="h-2 w-2 rounded-full bg-blue-900" />
          Project Case Study
        </div>
        <h1 className="mt-3 text-4xl md:text-5xl font-bold text-blue-900">
          {project.title}
        </h1>
        <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
          {project.description}
        </p>
      </header>

      {/* ===== Project Details Board ===== */}
      <section className="mb-14">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Left: Meta + Links */}
          <div className="rounded-2xl bg-gradient-to-r from-white via-gray-50 to-white shadow-md border p-6 hover:shadow-lg hover:-translate-y-1 transition">
            <h3 className="text-lg font-semibold text-blue-900 flex items-center gap-2">
              <span className="inline-block h-4 w-1 rounded bg-blue-900" />
              Details
            </h3>

            {/* Role */}
            <div className="mt-5 flex items-start gap-3">
              <FiBriefcase className="mt-1 text-blue-900" />
              <div>
                <div className="text-sm text-gray-500">Role</div>
                <div className="font-medium text-gray-900">{project.role}</div>
              </div>
            </div>

            {/* Period */}
            <div className="mt-4 flex items-start gap-3">
              <FiCalendar className="mt-1 text-blue-900" />
              <div>
                <div className="text-sm text-gray-500">Period</div>
                <div className="font-medium text-gray-900">{period}</div>
              </div>
            </div>

            {/* Links */}
            <div className="mt-6 flex flex-wrap gap-3">
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg shadow bg-blue-900 text-white hover:bg-blue-800 transition"
                >
                  <FiExternalLink /> Live Demo
                </a>
              )}
              {project.git_link && (
                <a
                  href={project.git_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg shadow bg-gray-900 text-white hover:bg-black transition"
                >
                  <FiGithub /> GitHub
                </a>
              )}
            </div>
          </div>

          {/* Right: Tech + Features */}
          <div className="md:col-span-2 space-y-6">
            {/* Tech Stack */}
            <div className="rounded-2xl bg-gradient-to-r from-white via-gray-50 to-white shadow-md border p-6 hover:shadow-lg hover:-translate-y-1 transition">
              <div className="flex items-center gap-2">
                <FiTool className="text-blue-900" />
                <h3 className="text-lg font-semibold text-blue-900">Tech Stack</h3>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tech?.map((t, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full text-sm border border-blue-100 bg-blue-50 text-blue-900"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="rounded-2xl bg-gradient-to-r from-white via-gray-50 to-white shadow-md border p-6 hover:shadow-lg hover:-translate-y-1 transition">
              <div className="flex items-center gap-2">
                <FiCheckCircle className="text-blue-900" />
                <h3 className="text-lg font-semibold text-blue-900">Features</h3>
              </div>
              <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-6 text-gray-700">
                {project.features?.map((f, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-blue-900"></span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Demo & Gallery Tabs ===== */}
      <section className="mb-14 text-center">
        {/* Tabs */}
        <div className="inline-flex bg-gray-100 rounded-full p-1 mb-6">
          {["gallery", "demo"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-full font-medium text-sm transition ${
                activeTab === tab
                  ? "bg-blue-900 text-white shadow"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              {tab === "gallery" ? "gallery" : "demo"}
            </button>
          ))}
        </div>

        {/* Animated Content */}
        <div className="relative min-h-[300px]">
          <AnimatePresence mode="wait">
            {activeTab === "demo" && (
              <motion.div
                key="demo"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute w-full"
              >
                <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-lg border border-gray-200 bg-white">
  {project.demo ? (
    <iframe
      width="100%"
      height="100%"
      src={
        project.demo.includes("watch?v=")
          ? project.demo.replace("watch?v=", "embed/")
          : project.demo
      }
      title={`${project.title} demo video`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      loading="lazy"
    />
  ) : (
    <div className="h-full w-full flex items-center justify-center text-gray-500">
      Demo video coming soon…
    </div>
  )}
</div>
              </motion.div>
            )}

            {activeTab === "gallery" && (
              <motion.div
                key="gallery"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute w-full"
              >
                <div className="relative w-full overflow-hidden rounded-2xl shadow-lg border border-gray-200 bg-white">
                  {/* Slides */}
                  <div
                    className="flex transition-transform duration-500 ease-out"
                    style={{ transform: `translateX(-${current * 100}%)` }}
                  >
                    {project.images?.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt={`Screenshot ${i + 1} of ${project.title}`}
                        className="w-full aspect-video object-cover flex-shrink-0"
                        draggable={false}
                      />
                    ))}
                  </div>

                  {/* Arrows */}
                  <button
                    onClick={prevSlide}
                    className="absolute top-1/2 left-3 -translate-y-1/2 bg-white/70 hover:bg-white text-gray-700 shadow p-2 rounded-full"
                  >
                    <FiChevronLeft size={22} />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute top-1/2 right-3 -translate-y-1/2 bg-white/70 hover:bg-white text-gray-700 shadow p-2 rounded-full"
                  >
                    <FiChevronRight size={22} />
                  </button>

                  {/* Bullets */}
                  <div className="absolute bottom-3 w-full flex justify-center gap-2">
                    {project.images?.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        className={`h-2.5 rounded-full transition-all ${
                          current === i
                            ? "w-6 bg-blue-900"
                            : "w-2.5 bg-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  )
}

export default Project
