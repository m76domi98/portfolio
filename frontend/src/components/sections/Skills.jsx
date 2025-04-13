import React from 'react';
import '../../styles/Skills.css';

const Skills = () => {
  const skillCategories = [
    {
      title: "Languages & Frameworks",
      skills: [
        { name: "Python", icon: "python" },
        { name: "C++", icon: "code" },
        { name: "Java", icon: "java" },
        { name: "HTML5", icon: "html5" },
        { name: "CSS3", icon: "css3" },
        { name: "JavaScript", icon: "js" },
        { name: "Node.js", icon: "node-js" },
        { name: "Vue.js", icon: "vuejs" },
        { name: "React", icon: "react" },
        { name: "TypeScript", icon: "code" },
        { name: "C#", icon: "code" },
        { name: ".NET", icon: "microsoft" },
        { name: "Flask", icon: "flask" }
      ]
    },
    {
      title: "AI/ML & Data",
      skills: [
        { name: "TensorFlow", icon: "brain" },
        { name: "Scikit-learn", icon: "brain" },
        { name: "Pandas", icon: "database" },
        { name: "XGBoost", icon: "bolt" },
        { name: "SQL", icon: "database" },
        { name: "Regression Models", icon: "chart-line" },
        { name: "Transformers", icon: "robot" },
        { name: "NLTK", icon: "language" }
      ]
    },
    {
      title: "Hardware",
      skills: [
        { name: "STM32 NucleoBoards", icon: "microchip" },
        { name: "Raspberry Pi", icon: "raspberry-pi" },
        { name: "Arduino", icon: "microchip" },
        { name: "Breadboarding", icon: "project-diagram" },
        { name: "Soldering", icon: "tools" },
        { name: "3D Printing", icon: "cube" }
      ]
    },
    {
      title: "Tools & Software",
      skills: [
        { name: "Git", icon: "git-alt" },
        { name: "VS Code", icon: "code" },
        { name: "PyCharm", icon: "code" },
        { name: "Unity", icon: "gamepad" },
        { name: "Arduino IDE", icon: "microchip" },
        { name: "Onshape", icon: "cubes" },
        { name: "AutoCAD", icon: "drafting-compass" },
        { name: "PCB Design", icon: "microchip" },
        { name: "Speechify", icon: "headphones" },
        { name: "Ollama", icon: "brain" }
      ]
    },
    {
      title: "Soft Skills",
      skills: [
        { name: "Leadership", icon: "user-tie" },
        { name: "Teamwork", icon: "users" },
        { name: "Communication", icon: "comments" },
        { name: "Problem-solving", icon: "lightbulb" },
        { name: "Time Management", icon: "clock" },
        { name: "Adaptability", icon: "sync" }
      ]
    },
    {
      title: "Certifications",
      skills: [
        { name: "React JS (Certified)", icon: "certificate" },
        { name: "SQL for Data Analysis (Enrolled)", icon: "book-open" }
      ]
    }
  ];

  return (
    <section id="skills" className="skills-section">
      <div className="container">
        <div className="section-header">
          <h1 className="stack-heading">My Tech Stack</h1>
        </div>
        
        <div className="skills-container">
          {skillCategories.map((category, index) => (
            <div key={index} className="skills-category">
              <h3 className="category-title">{category.title}</h3>
              <div className="skills-grid">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="skill-badge">
                    <div className="icon-container">
                      <i className={`fas fa-${skill.icon}`}></i>
                    </div>
                    <span className="skill-name">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;