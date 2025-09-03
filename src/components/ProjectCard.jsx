import React from 'react'

function ProjectCard({ image, title, role, description, technologies,onClick }) {
  return (
    <div
       onClick={onClick}
      className="bg-gradient-to-r from-slate-100 via-white to-slate-100 rounded-lg shadow-md 
                 cursor-pointer transform transition duration-300 hover:scale-105 hover:shadow-xl 
                 flex flex-col max-w-sm overflow-hidden w-96"
    >
      {/* Image should span full width */}
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover "
      />

      {/* Content */}
      <div className="p-6 flex flex-col items-center">
        <h3 className="text-xl font-bold mb-1">{title}</h3>
        <span className="text-sm text-gray-500 mb-2">{role}</span>
        <p className="text-gray-700 mb-4 text-center">{description}</p>
        <div className="flex flex-wrap gap-2 justify-center">
          {technologies.map((tech, idx) => (
            <span
              key={idx}
              className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProjectCard
