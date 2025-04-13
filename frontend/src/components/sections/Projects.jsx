import { useState, useEffect } from 'react';
import '../../styles/Projects.css';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const projects = [
    {
      id: 1,
      title: '3D-Printing Infill Error Correction',
      category: 'app',
      image: 'https://images.unsplash.com/photo-1581092919535-42eaf62d58b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80',
      description: 'Algorithm to fix 3D-printing infill errors using coordinate analysis and toolpath optimization.',
      technologies: ['Python', 'Matplotlib', 'FullControl', 'Onshape'],
      demoLink: '',
      codeLink: '',
      featured: true
    },
    {
      id: 2,
      title: 'SAMA Economic Heatmaps',
      category: 'web',
      image: 'https://images.unsplash.com/photo-1607703705954-d7c946e1c1a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80',
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
      category: 'ai',
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
      category: 'ui',
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
