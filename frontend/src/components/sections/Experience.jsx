import React, { useState, useEffect } from 'react';
import fast from '/Fast.png';
import stubbes from '/stubbes.png';
import '../../styles/Experience.css';

const Experience = () => {
    const [activeFilter, setActiveFilter] = useState('all');
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [isAnimating, setIsAnimating] = useState(false);

    const experiences = [
        {
            id: 1,
            title: 'Free Appropriate Sustainability Technology (FAST) Research Group',
            role: 'Volunteer Research Assistant',
            date: 'May 2023 - Mar 2024',
            description: 'I assisted in the development of Solar Alone Multi-Objective Advisor (SAMA) and resolved infill errors in 3D printing using Python along with PhD. students. I produced heatmaps related to economic data for SAMA which is used to optimize the size and cost of photovoltaic systems. I formulated an algorithm that corrects infill errors in 3D-Printing by triangulating error shapes, filling them in, and generating the corrective GCODE.',
            technologies: ['Python', '3d-printing', 'Data Analysis', 'Matplotlib', 'G-code', 'CAD'],
            image: fast
        },
        {
            id: 2,
            title: 'Stubbes Precast',
            role: 'Programmer Analyst',
            date: 'Jan 2025- April 2025',
            description: 'As a Programmer Analyst, I improved how employees interact with our internal systems by integrating an AI chatbot. This made it easier for staff to get answers to common questions and work more efficiently. I also developed predictive models that help estimate warehouse production timelines more accurately, improving forecasts by 15%. To ensure these predictions were useful in real-world operations, I worked closely with the production team. Additionally, I streamlined data processes by enhancing SQL queries and building automated reporting tools using Python, helping the company access real-time insights',
            technologies: [ 'C#', 'SQL', 'Vue.js', 'Python', 'TensorFlow', '.NET', 'Node.js', 'TypeScript', 'XGBoost', 'Scikit-learn', 'Pandas', 'Data Analysis'],
            image: stubbes
        }
    ];

    useEffect(() => {
        setFilteredProjects(experiences);
    }, []);

    // Sort experience items by date (most recent first)
    const sortedExperiences = [...filteredProjects].sort((a, b) => {
        // Simple sort assuming Winter 2025 is more recent than Summer 2024
        if (a.date.includes('2025') && b.date.includes('2024')) return -1;
        if (a.date.includes('2024') && b.date.includes('2025')) return 1;
        return 0;
    });

    return (
        <section id="experience" className="experience">
            <div className="section-header">
                <h2 className="section-title">Experience</h2>
                <p className="section-subtitle">My professional journey</p>
            </div>

            <div className="experience-timeline">
                <div className="timeline-line"></div>

                {sortedExperiences.map((item) => (
                    <div key={item.id} className="timeline-item">
                        <div className="timeline-dot">
                            <img src={item.image} alt={item.title} />
                        </div>


                        <div className="timeline-content">
                            <div className="timeline-details">
                                <h3 className="timeline-title">{item.title}</h3>
                                <p className="timeline-role">{item.role}</p>
                                <div className="timeline-description">
                                   <p>{item.description}</p> 
                                </div>


                                <div className="timeline-tech">
                                    {item.technologies.map((tech, index) => (
                                        <span key={index} className="timeline-badge">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Experience;