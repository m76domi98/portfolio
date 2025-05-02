import { useState, useEffect } from 'react';
import '../../styles/Projects.css';
import printing3dImage from '/3d_print.webp';
import sama from '/heatmap.webp';
import SenseSecure from '/SenseSecure.png';
import summus from '/summus.png'
import portfolio from '/portfolio_.png';
import podcastify from '/podcast.png';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const projects = [
    {
      id: 1,
      title: 'SenseSecure Alarm System',
      category: ['embedded-iot'],
      image: SenseSecure,
      description: 'Adaptive alarm system for the legally blind with audio, LED, and Braille integration.',
      technologies: ['C++', 'STM32', 'PCB Design', 'Ultrasonic Sensors', 'Microcontroller Communication'],
      demoLink: '',
      codeLink: 'https://github.com/samiksha-satthy/ece-198-SenseSecure',
      featured: true
    },
    {
      id: 2,
      title: 'Podcastify',
      category: ['ai-ml', 'web'],
      image: podcastify,
      description: 'Hackathon project that turns PDFs into audio using Natural Language Processing, voice tools, and Flask backend.',
      technologies: ['Python', 'Flask', 'Speechify', 'NLTK', 'Vue', ],
      demoLink: '',
      codeLink: 'https://github.com/m76domi98/geesehack2025',
      featured: true
    },
    {
      id: 3,
      title: 'Summus (T&C Summarizer)',
      category: ['web', 'ai-ml'],
      image: summus,
      description: 'Chrome extension that summarizes terms and conditions using a Python backend with Ollama and a vanilla JavaScript UI.',
      technologies: ['Python', 'JavaScript', 'HTML', 'LLMs','FastAPI'],
      demoLink: '',
      codeLink: 'https://github.com/m76domi98/AI_AGENT',
      featured: true
    },
    {
      id: 4,
      title: '3D-Printing Infill Error Correction',
      category: ['automation'],
      image: printing3dImage,
      description: 'Algorithm to fix 3D-printing infill errors using coordinate analysis and toolpath optimization.',
      technologies: ['Python', 'Matplotlib', 'FullControl', 'Onshape', '3D Printing', 'CAD', 'G-code'],
      demoLink: '',
      codeLink: 'https://github.com/m76domi98/FAST-LAB',
      featured: false
    },
    {
      id: 5,
      title: 'Portfolio Website',
      category: ['web'],
      image: portfolio,
      description: 'Personal portfolio built with React and JavaScript showcasing technical projects and design.',
      technologies: ['React', 'JavaScript', 'CSS', 'HTML'],
      demoLink: '',
      codeLink: 'https://github.com/m76domi98/portfolio',
      featured: false
    },
    {
      id: 6,
      title: 'SAMA Economic Heatmaps',
      category: ['data-analytics'],
      image: sama,
      description: 'Economic heatmaps for a solar PV system optimizer showing hybrid energy system costs over time.',
      technologies: ['Python', 'Matplotlib'],
      demoLink: '',
      codeLink: '',
      featured: false
    },
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
        setFilteredProjects(projects.filter(project =>
          project.category.includes(filter)
        ));
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
          <button className={activeFilter === 'all' ? 'active' : ''} onClick={() => handleFilterClick('all')}>All</button>
          <button className={activeFilter === 'featured' ? 'active' : ''} onClick={() => handleFilterClick('featured')}>Featured</button>
          <button className={activeFilter === 'ai-ml' ? 'active' : ''} onClick={() => handleFilterClick('ai-ml')}>AI & Machine Learning</button>
          <button className={activeFilter === 'data-analytics' ? 'active' : ''} onClick={() => handleFilterClick('data-analytics')}>Data Analytics & Visualization</button>
          <button className={activeFilter === 'embedded-iot' ? 'active' : ''} onClick={() => handleFilterClick('embedded-iot')}>Embedded Systems & IoT</button>
          <button className={activeFilter === 'web' ? 'active' : ''} onClick={() => handleFilterClick('web')}>Web Applications</button>
          <button className={activeFilter === 'automation' ? 'active' : ''} onClick={() => handleFilterClick('automation')}>Software Automation</button>
        </div>

        <div className={`projects-grid ${isAnimating ? 'animating' : ''}`}>
          {filteredProjects.map((project) => (
            <div className="project-card" key={project.id}>
              <div className="project-image">
                <img src={project.image} alt={project.title} />
                <div className="project-overlay">
                  <div className="project-links">
                    {project.id === 7 && project.demoLink && (
                      <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="project-link">
                        <i className="fas fa-eye"></i> Live Demo
                      </a>
                    )}
                    {project.codeLink && (
                      <a href={project.codeLink} target="_blank" rel="noopener noreferrer" className="project-link">
                        <i className="fas fa-code"></i> Source Code
                      </a>
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
                    <span key={index} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="projects-cta">
          <a href="https://github.com/m76domi98" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
            <i className="fab fa-github"></i> View More on GitHub
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
