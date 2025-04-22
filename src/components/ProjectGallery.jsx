"use client"

import { useState } from "react"
import { Card, CardContent } from "../components/ui/Card"
import Button from "../components/ui/Button"

const ProjectGallery = ({ projects }) => {
  const [selectedProject, setSelectedProject] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const openProject = (project, index = 0) => {
    setSelectedProject(project)
    setCurrentImageIndex(index)
    document.body.style.overflow = "hidden"
  }

  const closeProject = () => {
    setSelectedProject(null)
    document.body.style.overflow = "auto"
  }

  const nextImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % selectedProject.images.length)
    }
  }

  const prevImage = () => {
    if (selectedProject) {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex - 1 + selectedProject.images.length) % selectedProject.images.length,
      )
    }
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <div className="relative h-48 cursor-pointer" onClick={() => openProject(project)}>
              <img
                src={project.images[0] || "/placeholder.svg"}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <span className="text-white font-medium">Ver Projeto</span>
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-1">{project.title}</h3>
              <p className="text-gray-500 text-sm mb-2">
                {project.type} • {project.year}
              </p>
              <p className="text-gray-700 text-sm line-clamp-2">{project.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal de visualização do projeto */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] flex flex-col">
            <div className="p-4 border-b flex items-center justify-between">
              <h3 className="font-semibold text-lg">{selectedProject.title}</h3>
              <button onClick={closeProject} className="text-gray-500 hover:text-gray-700" aria-label="Fechar">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-auto p-4">
              <div className="relative h-[50vh]">
                <img
                  src={selectedProject.images[currentImageIndex] || "/placeholder.svg"}
                  alt={`${selectedProject.title} - Imagem ${currentImageIndex + 1}`}
                  className="w-full h-full object-contain"
                />
                {selectedProject.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
                      aria-label="Imagem anterior"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
                      aria-label="Próxima imagem"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </>
                )}
              </div>
              <div className="mt-4">
                <p className="text-gray-500 text-sm mb-2">
                  {selectedProject.type} • {selectedProject.year}
                </p>
                <p className="text-gray-700">{selectedProject.description}</p>
              </div>
              {selectedProject.images.length > 1 && (
                <div className="mt-4 flex gap-2 overflow-x-auto py-2">
                  {selectedProject.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-20 h-20 flex-shrink-0 rounded overflow-hidden ${
                        index === currentImageIndex ? "ring-2 ring-primary-500" : ""
                      }`}
                    >
                      <img src={image || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="p-4 border-t">
              <Button onClick={closeProject}>Fechar</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProjectGallery
