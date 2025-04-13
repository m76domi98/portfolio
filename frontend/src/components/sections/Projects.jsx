import { useState } from 'react';
import '../../styles/Projects.css';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const projects = [
    {
      id: 1,
      title: 'E-commerce Website',
      category: 'web',
      image: 'https://via.placeholder.com/600x400',
      description: 'A fully responsive e-commerce platform with product filtering, cart functionality, and payment integration.',
      technologies: ['React', 'Node.js', 'Express', 'MongoDB'],
      demoLink: 'https://example.com',
      codeLink: 'https://github.com',
    },
    {
      id: 2,
      title: 'Task Management App',
      category: 'app',
      image: 'https://via.placeholder.com/600x400',
      description: 'A task management application with drag-and-drop functionality, user authentication, and real-time updates.',
      technologies: ['React', 'Firebase', 'Material UI'],
      demoLink: 'https://example.com',
      codeLink: 'https://github.com',
    },
    {
      id: 3,
      title: 'Restaurant Website',
      category: 'web',
      image: 'https://via.placeholder.com/600x400',
      description: 'A modern restaurant website with online reservation system, menu display, and event booking.',
      technologies: ['React', 'CSS', 'API Integration'],
      demoLink: 'https://example.com',
      codeLink: 'https://github.com',
    },
    {
      id: 4,
      title: 'Weather Dashboard',
      category: 'app',
      image: 'https://via.placeholder.com/600x400',
      description: 'A weather dashboard that displays current and forecasted weather data based on location.',
      technologies: ['JavaScript', 'APIs', 'HTML', 'CSS'],
      demoLink: 'https://example.com',
      codeLink: 'https://github.com',
    },
    {
      id: 5,
      title: 'Portfolio Design',
      category: 'design',
      image: 'https://via.placeholder.com/600x400',
      description: 'A clean and modern portfolio design for creative professionals.',
      technologies: ['Figma', 'Adobe XD'],
      demoLink: 'https://example.com',
      codeLink: 'https://github.com',
    },
    {
      id: 6,
      title: 'Blog Platform',
      category: 'web',
      image: 'https://via.placeholder.com/600x400',
      description: 'A blog platform with content management system, user authentication, and comment functionality.',
      technologies: ['React', 'Node.js', 'MongoDB'],
      demoLink: 'https://example.com',
      codeLink: 'https://github.com',
    },
  ];

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(project => project.category === activeFilter);

  return (
    <section id="projects" className="projects">
      <div className="container">
        <h2 className="section-title">My Projects</h2>
        <div className="project-filters">
          <button
            className={activeFilter === 'all' ? 'active' : ''}
            onClick={() => setActiveFilter('all')}
          >
            All
          </button>
          <button
            className={activeFilter === 'web' ? 'active' : ''}
            onClick={() => setActiveFilter('web')}
          >
            Web
          </button>
          <button
            className={activeFilter === 'app' ? 'active' : ''}
            onClick={() => setActiveFilter('app')}
          >
            App
          </button>
          <button
            className={activeFilter === 'design' ? 'active' : ''}
            onClick={() => setActiveFilter('design')}
          >
            Design
          </button>
        </div>
        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <div className="project-card" key={project.id}>
              <div className="project-image">
                <img src={project.image} alt={project.title} />
                <div className="project-overlay">
                  <div className="project-links">
                    <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="project-link">
                      Live Demo
                    </a>
                    <a href={project.codeLink} target="_blank" rel="noopener noreferrer" className="project-link">
                      Source Code
                    </a>
                  </div>
                </div>
              </div>
              <div className="project-info">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-tech">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
