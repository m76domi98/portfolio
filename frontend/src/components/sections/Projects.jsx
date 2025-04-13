import { useState, useEffect } from 'react';
import '../../styles/Projects.css';
import printing3dImage from '../../assets/print3d.jpg';
import sama from '../../assets/sama.jpg';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const projects = [
    {
      id: 1,
      title: '3D-Printing Infill Error Correction',
      category: 'automation',
      image: printing3dImage,
      description: 'Algorithm to fix 3D-printing infill errors using coordinate analysis and toolpath optimization.',
      technologies: ['Python', 'Matplotlib', 'FullControl', 'Onshape'],
      demoLink: '',
      codeLink: '',
      featured: true
    },
    {
      id: 2,
      title: 'SAMA Economic Heatmaps',
      category: 'ai-data',
      image: sama,
      description: 'Economic heatmaps for a solar PV system optimizer showing hybrid energy system costs over time.',
      technologies: ['Python', 'Matplotlib'],
      demoLink: '',
      codeLink: '',
      featured: false
    },
    {
      id: 3,
      title: 'SenseSecure Alarm System',
      category: 'hardware',
      image: 'https://images.unsplash.com/photo-1605902711622-cfb43c4437f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80',
      description: 'Adaptive alarm system for the legally blind with audio, LED, and Braille integration.',
      technologies: ['C++', 'STM32', 'PCB Design', 'Ultrasonic Sensors'],
      demoLink: '',
      codeLink: '',
      featured: true
    },
    {
      id: 4,
      title: 'Podcastify',
      category: 'web',
      image: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80',
      description: 'Hackathon project that turns PDFs into audio using NLP, voice tools, and Flask backend.',
      technologies: ['Python', 'Flask', 'Speechify', 'NLTK', 'Vue'],
      demoLink: '',
      codeLink: '',
      featured: false
    },
    {
      id: 5,
      title: 'Summus (T&C Summarizer)',
      category: 'web',
      image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80',
      description: 'Chrome extension that summarizes terms and conditions using a Python backend with Ollama and a clean JavaScript UI.',
      technologies: ['Python', 'JavaScript', 'HTML', 'Ollama'],
      demoLink: '',
      codeLink: '',
      featured: true
    },
    {
      id: 6,
      title: 'Real-time Sign Language Detection',
      category: 'ai-data',
      image: 'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80',
      description: 'Real-time detection of sign language using computer vision and deep learning with TensorFlow.',
      technologies: ['Python', 'TensorFlow', 'OpenCV', 'Transfer Learning'],
      demoLink: '',
      codeLink: '',
      featured: true
    },
    {
      id: 7,
      title: 'Portfolio Website',
      category: 'web',
      image: 'https://images.unsplash.com/photo-1505685296765-3a2736de412f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80',
      description: 'Personal portfolio built with React and JavaScript showcasing technical projects and design.',
      technologies: ['React', 'JavaScript', 'CSS'],
      demoLink: '',
      codeLink: '',
      featured: false
    }
  ];

  useEffect(() => {
    setFilteredProjects(projects);
  }, []);

  const handleFilterClick = (filter) => {
    setIsAnimating(true);
    setActiveFilter(filter);

    setTimeout(() => {
      if (filter === 'all') {
        setFilteredProjects(projects);
      } else if (filter === 'featured') {
        setFilteredProjects(projects.filter(project => project.featured));
      } else {
        setFilteredProjects(projects.filter(project => project.category === filter));
      }
      setIsAnimating(false);
    }, 500);
  };

  return (
    <section id="projects" className="projects">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">My Projects</h2>
        </div>

        <div className="project-filters">
          <button className={activeFilter === 'all' ? 'active' : ''} onClick={() => handleFilterClick('all')}>
            All
          </button>
          <button className={activeFilter === 'featured' ? 'active' : ''} onClick={() => handleFilterClick('featured')}>
            Featured
          </button>
          <button className={activeFilter === 'ai-data' ? 'active' : ''} onClick={() => handleFilterClick('ai-data')}>
            AI / Data
          </button>
          <button className={activeFilter === 'hardware' ? 'active' : ''} onClick={() => handleFilterClick('hardware')}>
            Hardware
          </button>
          <button className={activeFilter === 'web' ? 'active' : ''} onClick={() => handleFilterClick('web')}>
            Web
          </button>
          <button className={activeFilter === 'automation' ? 'active' : ''} onClick={() => handleFilterClick('automation')}>
            Automation
          </button>
        </div>

        <div className={`projects-grid ${isAnimating ? 'animating' : ''}`}>
          {filteredProjects.map((project) => (
            <div className="project-card" key={project.id}>
              <div className="project-image">
                <img src={project.image} alt={project.title} />
                <div className="project-overlay">
                  <div className="project-links">
                    {project.id === 7 && (
                      <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="project-link">
                        <i className="fas fa-eye"></i> Live Demo
                      </a>
                    )}
                    {project.id !== 2 && (
                      <a href={project.codeLink} target="_blank" rel="noopener noreferrer" className="project-link">
                        <i className="fas fa-code"></i> Source Code
                      </a>
                    )}
                    {project.id === 1 && (
                      <div className="project-attribution">
                        <a
                          href="https://www.freepik.com/free-photo/designer-using-3d-printer_78922830.htm#fromView=keyword&page=1&position=1&uuid=222603b4-e842-4e71-b2dd-297d087c79b2&query=Prusa"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="attribution-link"
                        >
                          Image by Freepik
                        </a>
                      </div>
                    )}
                    {project.id === 2 && (
                      <div className="project-attribution">
                        <a
                          href="https://www.freepik.com/free-photo/beautiful-alternative-energy-plant-with-solar-panels_20735352.htm#fromView=search&page=1&position=3&uuid=76c81470-fc84-42e6-994e-d07c732fda2b&query=solar+panel"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="attribution-link"
                        >
                          Image by Freepik
                        </a>
                      </div>
                    )}

                  </div>
                </div>
              </div>
              <div className="project-info">
                <div className="project-header">
                  <h3 className="project-title">{project.title}</h3>
                  {project.featured && <span className="featured-badge">Featured</span>}
                </div>
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

        <div className="projects-cta">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
            <i className="fab fa-github"></i> View More on GitHub
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
