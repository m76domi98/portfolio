import '../../styles/Skills.css';

const Skills = () => {
  const skillsData = [
    { name: 'HTML5', level: 90 },
    { name: 'CSS3', level: 85 },
    { name: 'JavaScript', level: 90 },
    { name: 'React', level: 85 },
    { name: 'Node.js', level: 75 },
    { name: 'Git', level: 80 },
    { name: 'Responsive Design', level: 95 },
    { name: 'UI/UX Design', level: 70 },
  ];

  return (
    <section id="skills" className="skills">
      <div className="container">
        <h2 className="section-title">My Skills</h2>
        <div className="skills-content">
          <div className="skills-description">
            <h3>Technical Expertise</h3>
            <p>
              I've worked with a variety of programming languages, frameworks, and
              tools throughout my career. My core expertise is in frontend development
              with React, but I'm also comfortable working with backend technologies
              and have experience with the full development lifecycle.
            </p>
          </div>
          <div className="skills-list">
            {skillsData.map((skill, index) => (
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
      </div>
    </section>
  );
};

export default Skills;
