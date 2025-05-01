import React, { useState, useEffect } from 'react';
import '../../styles/Skills.css';
import {
  FaCertificate, FaMicrochip, FaBolt, FaRobot, FaCube,
  FaTools, FaDraftingCompass, FaHeadphones, FaProjectDiagram,
  FaBrain, FaChartLine, FaLanguage
} from 'react-icons/fa';

const Skills = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const skillCategories = [
    {
      title: "Languages & Frameworks",
      skills: [
        { name: "Python", iconClass: "devicon-python-plain colored" },
        { name: "C++", iconClass: "devicon-cplusplus-plain colored" },
        { name: "Java", iconClass: "devicon-java-plain colored" },
        { name: "HTML5", iconClass: "devicon-html5-plain colored" },
        { name: "CSS3", iconClass: "devicon-css3-plain colored" },
        { name: "JavaScript", iconClass: "devicon-javascript-plain colored" },
        { name: "Node.js", iconClass: "devicon-nodejs-plain colored" },
        { name: "Vue.js", iconClass: "devicon-vuejs-plain colored" },
        { name: "React", iconClass: "devicon-react-original colored" },
        { name: "TypeScript", iconClass: "devicon-typescript-plain colored" },
        { name: "C#", iconClass: "devicon-csharp-plain colored" },
        { name: ".NET", iconClass: "devicon-dot-net-plain colored" },
        { name: "Flask", iconClass: "devicon-flask-original colored" },
      ],
    },
    {
      title: "AI/ML & Data",
      skills: [
        { name: "TensorFlow", iconClass: "devicon-tensorflow-original colored" },
        { name: "Scikit-learn", iconClass: "devicon-scikit-learn-plain colored" },
        { name: "Pandas", iconClass: "devicon-pandas-original colored" },
        { name: "XGBoost", customIcon: <FaChartLine /> },
        { name: "SQL", iconClass: "devicon-mysql-plain colored" },
        { name: "Regression Models", customIcon: <FaBrain /> },
        { name: "Transformers", customIcon: <FaRobot /> },
        { name: "NLTK", customIcon: <FaLanguage /> },
      ],
    },
    {
      title: "Hardware",
      skills: [
        { name: "STM32", customIcon: <FaMicrochip /> },
        { name: "Raspberry Pi", customIcon: <FaCube /> },
        { name: "Arduino", iconClass: "devicon-arduino-plain colored" },
        { name: "Breadboarding", customIcon: <FaTools /> },
        { name: "Soldering", customIcon: <FaBolt /> },
        { name: "3D Printing", customIcon: <FaDraftingCompass /> },
      ],
    },
    {
      title: "Tools & Software",
      skills: [
        { name: "Git", iconClass: "devicon-git-plain colored" },
        { name: "VS Code", iconClass: "devicon-vscode-plain colored" },
        { name: "PyCharm", iconClass: "devicon-pycharm-plain colored" },
        { name: "Unity", iconClass: "devicon-unity-original colored" },
        { name: "Arduino IDE", iconClass: "devicon-arduino-plain colored" },
        { name: "Onshape", customIcon: <FaProjectDiagram /> },
        { name: "AutoCAD", iconClass: "devicon-autocad-plain colored" },
        { name: "PCB Design", customIcon: <FaMicrochip /> },
        { name: "Speechify", customIcon: <FaHeadphones /> },
        { name: "Ollama", customIcon: <FaRobot /> },
        {name: 'Vercel', iconClass: 'devicon-vercel-original colored'},
      ],
    },
    {
      title: "Certifications",
      skills: [
        { name: "React JS", iconClass: "devicon-react-original colored" },
        { name: "SQL for Data Analysis (In Progress)", iconClass: "devicon-mysql-plain colored" },
      ],
    },
  ];

  const allSkills = skillCategories.flatMap(cat => cat.skills);

  useEffect(() => {
    if (selectedCategory === "All") return;

    const interval = setInterval(() => {
      setSelectedCategory(prev => {
        const categories = skillCategories.map(cat => cat.title);
        const currentIndex = categories.indexOf(prev);
        const nextIndex = (currentIndex + 1) % categories.length;
        return categories[nextIndex];
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [selectedCategory]);

  const additionalStyles = `
    .devicon-python-plain.colored { color: #3772A4 !important; }
    .devicon-cplusplus-plain.colored { color: #00599C !important; }
    .devicon-java-plain.colored { color: #EA2D2E !important; }
    .devicon-html5-plain.colored { color: #E34F26 !important; }
    .devicon-css3-plain.colored { color: #1572B6 !important; }
    .devicon-javascript-plain.colored { color: #F7DF1E !important; }
    .devicon-nodejs-plain.colored { color: #339933 !important; }
    .devicon-vuejs-plain.colored { color: #4FC08D !important; }
    .devicon-react-original.colored { color: #61DAFB !important; }
    .devicon-typescript-plain.colored { color: #3178C6 !important; }
    .devicon-csharp-plain.colored { color: #239120 !important; }
    .devicon-dot-net-plain.colored { color: #512BD4 !important; }
    .devicon-flask-original.colored { color: #000000 !important; }
    .devicon-tensorflow-original.colored { color: #FF6F00 !important; }
    .devicon-pandas-original.colored { color: #150458 !important; }
    .devicon-scikit-learn-plain.colored { color: #F7931E !important; }
    .devicon-mysql-plain.colored { color: #4479A1 !important; }
    .devicon-git-plain.colored { color: #F05032 !important; }
    .devicon-vscode-plain.colored { color: #007ACC !important; }
    .devicon-pycharm-plain.colored { color: #31A8FF !important; }
    .devicon-unity-original.colored { color: #222C37 !important; }
    .devicon-autocad-plain.colored { color: #DA1212 !important; }
    .devicon-vercel-original.colored { color: #239120 !important; }
  `;

  return (
    <section id="skills" className="skills-section">
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />
      <style>{additionalStyles}</style>

      <div className="container">
        <div className="section-header">
          <h2 className="section-heading">EXPERTISE</h2>
          <h1 className="stack-heading">My Tech Stack</h1>
        </div>

        <div className="category-buttons">
          <button onClick={() => setSelectedCategory("All")} className={selectedCategory === "All" ? "active" : ""}>All</button>
          {skillCategories.map((cat, index) => (
            <button
              key={index}
              onClick={() => setSelectedCategory(cat.title)}
              className={selectedCategory === cat.title ? "active" : ""}
            >
              {cat.title}
            </button>
          ))}
        </div>

        <div className="skills-container">
          {selectedCategory === "All" ? (
            <div className="skills-grid">
              {allSkills.map((skill, index) => (
                <button key={index} className="skill-badge">
                  <div className="icon-container">
                    {skill.iconClass ? (
                      <i className={skill.iconClass}></i>
                    ) : (
                      skill.customIcon
                    )}
                  </div>
                  <span className="skill-name">{skill.name}</span>
                </button>
              ))}
            </div>
          ) : (
            skillCategories
              .filter(cat => cat.title === selectedCategory)
              .map((category, index) => (
                <div key={index} className="skills-grid">
                  {category.skills.map((skill, skillIndex) => (
                    <button key={skillIndex} className="skill-badge">
                      <div className="icon-container">
                        {skill.iconClass ? (
                          <i className={skill.iconClass}></i>
                        ) : (
                          skill.customIcon
                        )}
                      </div>
                      <span className="skill-name">{skill.name}</span>
                    </button>
                  ))}
                </div>
              ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Skills;
