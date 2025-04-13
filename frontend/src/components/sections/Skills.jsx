import { useState } from 'react';
import '../../styles/Skills.css';

const Skills = () => {
  const [activeTab, setActiveTab] = useState('technical');

  const technicalSkills = [
    { name: 'UI/UX Design', level: 95 },
    { name: 'HTML5 & CSS3', level: 90 },
    { name: 'JavaScript', level: 85 },
    { name: 'React', level: 88 },
    { name: 'Figma', level: 92 },
    { name: 'Responsive Design', level: 94 },
  ];

  const softSkills = [
    { name: 'Communication', level: 90 },
    { name: 'Problem Solving', level: 85 },
    { name: 'Creativity', level: 95 },
    { name: 'Teamwork', level: 88 },
    { name: 'Time Management', level: 82 },
    { name: 'Adaptability', level: 90 },
  ];

  const tools = [
    { name: 'Figma', icon: 'figma' },
    { name: 'Adobe XD', icon: 'adobe' },
    { name: 'Photoshop', icon: 'photoshop' },
    { name: 'VS Code', icon: 'code' },
    { name: 'Git', icon: 'git-alt' },
    { name: 'Sketch', icon: 'sketch' },
    { name: 'Illustrator', icon: 'adobe' },
    { name: 'React', icon: 'react' },
  ];

  return (
    <section id="skills" className="skills">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">My Skills</h2>
          <p className="section-subtitle">What I can do for you</p>
        </div>

        <div className="skill-tabs">
          <button
            className={`tab-btn ${activeTab === 'technical' ? 'active' : ''}`}
            onClick={() => setActiveTab('technical')}
          >
            Technical Skills
          </button>
          <button
            className={`tab-btn ${activeTab === 'soft' ? 'active' : ''}`}
            onClick={() => setActiveTab('soft')}
          >
            Soft Skills
          </button>
          <button
            className={`tab-btn ${activeTab === 'tools' ? 'active' : ''}`}
            onClick={() => setActiveTab('tools')}
          >
            Tools & Software
          </button>
        </div>

        <div className="skills-content">
          {activeTab === 'technical' && (
            <div className="tab-content">
              <div className="skills-description">
                <h3>Technical Expertise</h3>
                <p>
                  With a deep understanding of frontend technologies and design principles,
                  I create visually striking and functionally robust digital experiences.
                  My technical skills combine both design and development, allowing me to
                  bridge the gap between creativity and implementation.
                </p>
              </div>
              <div className="skills-list">
                {technicalSkills.map((skill, index) => (
                  <div className="skill-item" key={index}>
                    <div className="skill-info">
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-percentage">{skill.level}%</span>
                    </div>
                    <div className="skill-bar">
                      <div
                        className="skill-progress"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="tech-stack">
                <div className="tech-item"><i className="fab fa-react"></i></div>
                <div className="tech-item"><i className="fab fa-js"></i></div>
                <div className="tech-item"><i className="fab fa-figma"></i></div>
              </div>
          {activeTab === 'soft' && (
            <div className="tab-content">
              <div className="skills-description">
                <h3>Personal Qualities</h3>
                <p>
                  Beyond technical abilities, I bring a suite of soft skills that enhance
                  collaboration and project outcomes. My approach combines creative thinking
                  with structured problem-solving, ensuring effective communication and
                  timely delivery on every project.
                </p>
              </div>
              <div className="skills-list">
                {softSkills.map((skill, index) => (
                  <div className="skill-item" key={index}>
                    <div className="skill-info">
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-percentage">{skill.level}%</span>
                    </div>
                    <div className="skill-bar">
                      <div
                        className="skill-progress soft"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'tools' && (
            <div className="tab-content">
              <div className="skills-description">
                <h3>Tools & Technologies</h3>
                <p>
                  I maintain proficiency with industry-standard tools and emerging technologies,
                  continuously expanding my toolkit to deliver cutting-edge solutions. These
                  tools facilitate my design and development process, enabling me to create
                  high-quality, polished products.
                </p>
              </div>
              <div className="tools-grid">
                {tools.map((tool, index) => (
                  <div className="tool-item" key={index}>
                    <div className="tool-icon">
                      <i className={`fab fa-${tool.icon}`}></i>
                    </div>
                    <span className="tool-name">{tool.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Skills;
