import React from 'react';
import '../../styles/Skills.css';
import {
  FaUserTie,
  FaUsers,
  FaComments,
  FaLightbulb,
  FaClock,
  FaSync,
  FaCertificate,
  FaBookOpen,
  FaCube,
  FaTools,
  FaDraftingCompass,
  FaHeadphones,
  FaProjectDiagram,
  FaMicrochip,
  FaBolt,
  FaRobot,
  FaLanguage,
  FaChartLine,
  FaBrain
} from 'react-icons/fa';

const Skills = () => {
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
        { name: "Flask", iconClass: "devicon-flask-original colored" }
      ]
    },
    {
      title: "AI/ML & Data",
      skills: [
        { name: "TensorFlow", iconClass: "devicon-tensorflow-original colored" },
        { name: "Scikit-learn", customIcon: <FaBrain className="custom-icon" /> },
        { name: "Pandas", iconClass: "devicon-pandas-plain colored" },
        { name: "XGBoost", customIcon: <FaBolt className="custom-icon" /> },
        { name: "SQL", iconClass: "devicon-mysql-plain colored" },
        { name: "Regression Models", customIcon: <FaChartLine className="custom-icon" /> },
        { name: "Transformers", customIcon: <FaRobot className="custom-icon" /> },
        { name: "NLTK", customIcon: <FaLanguage className="custom-icon" /> }
      ]
    },
    {
      title: "Hardware",
      skills: [
        { name: "STM32 NucleoBoards", customIcon: <FaMicrochip className="custom-icon" /> },
        { name: "Raspberry Pi", iconClass: "devicon-raspberrypi-line colored" },
        { name: "Arduino", iconClass: "devicon-arduino-plain colored" },
        { name: "Breadboarding", customIcon: <FaProjectDiagram className="custom-icon" /> },
        { name: "Soldering", customIcon: <FaTools className="custom-icon" /> },
        { name: "3D Printing", customIcon: <FaCube className="custom-icon" /> }
      ]
    },
    {
      title: "Tools & Software",
      skills: [
        { name: "Git", iconClass: "devicon-git-plain colored" },
        { name: "VS Code", iconClass: "devicon-vscode-plain colored" },
        { name: "PyCharm", iconClass: "devicon-pycharm-plain colored" },
        { name: "Unity", iconClass: "devicon-unity-original colored" },
        { name: "Arduino IDE", iconClass: "devicon-arduino-plain-wordmark colored" },
        { name: "Onshape", customIcon: <FaCube className="custom-icon" /> },
        { name: "AutoCAD", customIcon: <FaDraftingCompass className="custom-icon" /> },
        { name: "PCB Design", customIcon: <FaMicrochip className="custom-icon" /> },
        { name: "Speechify", customIcon: <FaHeadphones className="custom-icon" /> },
        { name: "Ollama", customIcon: <FaBrain className="custom-icon" /> }
      ]
    },
    {
      title: "Soft Skills",
      skills: [
        { name: "Leadership", customIcon: <FaUserTie className="custom-icon" /> },
        { name: "Teamwork", customIcon: <FaUsers className="custom-icon" /> },
        { name: "Communication", customIcon: <FaComments className="custom-icon" /> },
        { name: "Problem-solving", customIcon: <FaLightbulb className="custom-icon" /> },
        { name: "Time Management", customIcon: <FaClock className="custom-icon" /> },
        { name: "Adaptability", customIcon: <FaSync className="custom-icon" /> }
      ]
    },
    {
      title: "Certifications",
      skills: [
        { name: "React JS (Certified)", iconClass: "devicon-react-plain colored" },
        { name: "SQL for Data Analysis (Enrolled)", iconClass: "devicon-mysql-plain colored" }
      ]
    }
  ];

  // Custom styles for Devicon and custom icons to match existing styling
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
    .devicon-git-plain.colored { color: #F05032 !important; }
    .devicon-mysql-plain.colored { color: #4479A1 !important; }
  `;

  return (
    <section id="skills" className="skills-section">
      {/* Include the Devicon stylesheet in your component */}
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />
      <style>{additionalStyles}</style>

      <div className="container">
        <div className="section-header">
          <h2 className="section-heading">EXPERTISE</h2>
          <h1 className="stack-heading">My Tech Stack</h1>
        </div>

        <div className="skills-container">
          {skillCategories.map((category, index) => (
            <div key={index} className="skills-category">
              <h3 className="category-title">{category.title}</h3>
              <div className="skills-grid">
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

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;