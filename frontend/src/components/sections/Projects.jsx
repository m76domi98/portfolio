import { useState, useEffect } from 'react';
import '../../styles/Projects.css';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const projects = [
    {
      id: 1,
      title: 'Cosmic Dashboard',
      category: 'ui',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      description: 'A sleek admin dashboard with dark theme and intuitive data visualization components.',
      technologies: ['React', 'Chart.js', 'CSS Grid'],
      demoLink: 'https://example.com',
      codeLink: 'https://github.com',
      featured: true
    },
    {
      id: 2,
      title: 'Nebula Mobile App',
      category: 'app',
      image: 'https://images.unsplash.com/photo-1540103711724-ebf833bde8d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      description: 'A mobile application for tracking celestial events and planning stargazing trips.',
      technologies: ['React Native', 'Expo', 'Firebase'],
      demoLink: 'https://example.com',
      codeLink: 'https://github.com',
      featured: true
    },
    {
      id: 3,
      title: 'Stellar E-commerce',
      category: 'web',
      image: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      description: 'A modern e-commerce platform with cosmic-themed products and seamless checkout experience.',
      technologies: ['React', 'Node.js', 'MongoDB'],
      demoLink: 'https://example.com',
      codeLink: 'https://github.com',
      featured: false
    },
    {
      id: 4,
      title: 'Galactic Weather',
      category: 'app',
      image: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      description: 'A weather dashboard with beautiful space-themed visualizations for different weather conditions.',
      technologies: ['JavaScript', 'APIs', 'CSS3'],
      demoLink: 'https://example.com',
      codeLink: 'https://github.com',
      featured: false
    },
    {
      id: 5,
      title: 'Aurora Portfolio',
      category: 'ui',
      image: 'https://images.unsplash.com/photo-1579033461380-adb47c3eb938?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      description: 'A stunning portfolio template with aurora-inspired design elements and smooth animations.',
      technologies: ['HTML5', 'CSS3', 'JavaScript'],
      demoLink: 'https://example.com',
      codeLink: 'https://github.com',
      featured: true
    },
    {
      id: 6,
      title: 'Orbit CRM',
      category: 'web',
      image: 'https://images.unsplash.com/photo-1581822261290-991b38693d1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      description: 'A customer relationship management system with space-themed UI and comprehensive analytics.',
      technologies: ['React', 'Redux', 'Node.js'],
      demoLink: 'https://example.com',
      codeLink: 'https://github.com',
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
          <p className="section-subtitle">Recent work I've done</p>
        </div>

        <div className="project-filters">
          <button
            className={activeFilter === 'all' ? 'active' : ''}
            onClick={() => handleFilterClick('all')}
          >
            All
          </button>
          <button
            className={activeFilter === 'featured' ? 'active' : ''}
            onClick={() => handleFilterClick('featured')}
          >
            Featured
          </button>
          <button
            className={activeFilter === 'web' ? 'active' : ''}
            onClick={() => handleFilterClick('web')}
          >
            Web
          </button>
          <button
            className={activeFilter === 'app' ? 'active' : ''}
            onClick={() => handleFilterClick('app')}
          >
            App
          </button>
          <button
            className={activeFilter === 'ui' ? 'active' : ''}
            onClick={() => handleFilterClick('ui')}
          >
            UI/UX
          </button>
        </div>

        <div className={`projects-grid ${isAnimating ? 'animating' : ''}`}>
          {filteredProjects.map((project) => (
            <div className="project-card" key={project.id}>
              <div className="project-image">
                <img src={project.image} alt={project.title} />
                <div className="project-overlay">
                  <div className="project-links">
                    <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="project-link">
                      <i className="fas fa-eye"></i> Live Demo
                    </a>
                    <a href={project.codeLink} target="_blank" rel="noopener noreferrer" className="project-link">
                      <i className="fas fa-code"></i> Source Code
                    </a>
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
