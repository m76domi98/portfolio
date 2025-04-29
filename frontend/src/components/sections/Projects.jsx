import { useState, useEffect } from 'react';
import '../../styles/Projects.css';
import printing3dImage from '../../assets/print3d.jpg';
import sama from '../../assets/sama.jpg';
import stm from '../../assets/stm.jpg';
import summus from '../../assets/summus.jpg';
import podcast from '../../assets/podcast.png';
import portfolio from '../../assets/portfolio.jpg';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const projects = [
    {
      id: 1,
      title: '3D-Printing Infill Error Correction',
      category: ['automation'],
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
      category: ['data-analytics'],
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
      category: ['embedded-iot'],
      image: stm,
      description: 'Adaptive alarm system for the legally blind with audio, LED, and Braille integration.',
      technologies: ['C++', 'STM32', 'PCB Design', 'Ultrasonic Sensors'],
      demoLink: '',
      codeLink: '',
      featured: true
    },
    {
      id: 4,
      title: 'Podcastify',
      category: ['ai-ml', 'web'],
      image: podcast,
      description: 'Hackathon project that turns PDFs into audio using NLP, voice tools, and Flask backend.',
      technologies: ['Python', 'Flask', 'Speechify', 'NLTK', 'Vue'],
      demoLink: '',
      codeLink: '',
      featured: false
    },
    {
      id: 5,
      title: 'Summus (T&C Summarizer)',
      category: ['web', 'ai-ml'],
      image: summus,
      description: 'Chrome extension that summarizes terms and conditions using a Python backend with Ollama and a clean JavaScript UI.',
      technologies: ['Python', 'JavaScript', 'HTML', 'LLMs'],
      demoLink: '',
      codeLink: '',
      featured: true
    },
    {
      id: 7,
      title: 'Portfolio Website',
      category: ['web'],
      image: portfolio,
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
                    {project.id === 1 && (
                      <div className="project-attribution">
                        <a href="https://www.freepik.com/free-photo/designer-using-3d-printer_78922830.htm" target="_blank" rel="noopener noreferrer" className="attribution-link">Image by Freepik</a>
                      </div>
                    )}
                    {project.id === 2 && (
                      <div className="project-attribution">
                        <a href="https://www.freepik.com/free-photo/beautiful-alternative-energy-plant-with-solar-panels_20735352.htm" target="_blank" rel="noopener noreferrer" className="attribution-link">Image by Freepik</a>
                      </div>
                    )}
                    {project.id === 3 && (
                      <div className="project-attribution">
                        <a href="https://fr.freepik.com/vecteurs-libre/fond-ingenierie-informatique-isometrique_4501450.htm" target="_blank" rel="noopener noreferrer" className="attribution-link">Image by Freepik</a>
                      </div>
                    )}
                    {project.id === 5 && (
                      <div className="project-attribution">
                        <a href="https://www.freepik.com/free-photo/terms-use-conditions-rule-policy-regulation-concept_18045122.htm" target="_blank" rel="noopener noreferrer" className="attribution-link">Image by Freepik</a>
                      </div>
                    )}
                    {project.id === 7 && (
                      <div className="project-attribution">
                        <p>
                          Photo by <a href="https://unsplash.com/@lautaroandreani?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Lautaro Andreani</a> on <a href="https://unsplash.com/photos/a-computer-screen-with-a-logo-on-it-UYsBCu9RP3Y?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
                        </p>
                      </div>
                    )}
                    {project.id !== 2 && (
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
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
            <i className="fab fa-github"></i> View More on GitHub
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
