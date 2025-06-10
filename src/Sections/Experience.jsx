import React, { useState, useRef, useEffect } from 'react';

function Experience({isSmall}) {
    const [activeSection, setActiveSection] = useState("Education");
    const tabsContainerRef = useRef(null);
    
    /* Add this CSS class to hide scrollbars */
    const scrollbarHideStyles = `
        .no-scrollbar::-webkit-scrollbar {
            display: none;
        }
        
        .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
    `;
    
    // Education data
    const education = [
        {
            institution: "Universitas Indonesia",
            degree: "Bachelor of Information Systems",
            period: "2022 - Present",
            description: "Currently in 3rd year with focus on software development."
        },
        {
            institution: "-",
            degree: "Fast Offer International Japanese Language Program",
            period: "2024 - Present",
            description: "Currently on my 3rd semester of this program."
        },
    ];
    
    // Formal Experience data
    const formalExperience = [
        {
            title: "Software Engineer Intern",
            company: "Sokratech",
            period: "June 2025 - Present",
            description: Null,
            skills: []
        },
        {
            title: "Teaching Assistant of Security Driven Software Development",
            company: "Faculty of Computer Science, Universitas Indonesia",
            period: "January 2025 - Present",
            description: "Scored assignemnts, answering questions regarding the lecture or assignments, helped students with their assignments.",
            skills: []
        },
        {
            title: "Frontend Developer Intern",
            company: "Avatar Solution",
            period: "May 2025 - Present",
            description: "Building frontend side of websites for clients.",
            skills: ["HTML/CSS", "Next JS", "React JS", "Tailwind CSS", "Typescript"]
        }
    ];
    
    // Organizational Experience data
    const organizationalExperience = [
        {
            title: "Team Member of Talent Intelligence",
            organization: "AIESEC Universitas Indonesia",
            period: "Feb 2023 - Feb 2024",
            description: "Analyzed members performance through both quantitative and qualitative measurements. Conducted meeting with 4 departments regarding their performance on each quarter.",
            skills: ["Leadership", "Analytical skill", "Team Coordination", "Communication"]
        },
        {
            title: "People Operations of Network, Security, and OS",
            organization: "RISTEK Fasilkom UI",
            period: "Feb 2022 - Jul 2023",
            description: "Assisted the operationals processs of Network, Security, and OS SIG of RISTEK Fasilkom UI.",
            skills: ["Team Coordination", "Communication"]
        }
    ];
    
    // Projects data
    const projects = [
        {
            title: "Personal Portfolio Website",
            description: "Designed and developed a responsive portfolio website using React and Tailwind CSS. Implemented responsive designs and interactive components.",
            period: "Apr 2024 - Present",
            link: "https://github.com/Photic23/FE-Porto",
            skills: ["React JS", "Tailwind CSS"]
        },
        {
            title: "OKK UI 2024",
            description: "Developed the Frontend side of OKK UI 2024 Website. Notes: The repository is private.",
            period: "Jun 2024 - Aug 2024",
            link: "https://github.com/okk-ui-2024",
            skills: ["React JS", "Next JS", "Tailwind CSS"]
        },
        {
            title: "BE Invotrax",
            description: "Working on the backend side of an inventory management apps for PT Karya Bersama Pinto. Im using django as the framework",
            period: "February 2025 - Present",
            link: "https://gitlab.cs.ui.ac.id/propensi-2024-2025-genap/kelas-a/a06-propenchill-be",
            skills: ["Python", "Django", "PostgreSQL" ]
        },
        {
            title: "FE Invotrax",
            description: "Working on the frontend side of an inventory management apps for PT Karya Bersama Pinto.",
            period: "February 2025 - Present",
            link: "https://gitlab.cs.ui.ac.id/propensi-2024-2025-genap/kelas-a/a06-propenchill-fe",
            skills: ["Next JS", "React JS", "Tailwind CSS"]
        },
        {
            title: "DevOps Invotrax",
            description: "Working on setting up the environments for the project (Tencent VPS for backend, Vercel for frontend, and CI/CD script for deployment automation).",
            period: "February 2025 - Present",
            link: "#",
            skills: ["Linux Operations", "CI/CD script (YAML)", "Tencent Cloud"]
        },
        {
            title: "RSISDM",
            description: "Worked on setting up Odoo 16 for a hospital scenario (SISDM assignment). Imported the necessary packages. Created a custom package for PPH21. Set the Odoo up on Azure VPS for deployment. Notes: the server is currently inactive",
            period: "October 2024 - December 2024",
            link: "#",
            skills: ["Linux Operations", "Odoo 16", "Azure Cloud"]
        }
    ];
    
    // Achievements data
    const achievements = [
        {
            title: "National Cyber Week CTF 2024 Finalist",
            organization: "BINUS University",
            period: "Oct 2024",
            description: "Solved challenges regarding cybersecurity and submitted the writeup."
        },
        {
            title: "2nd Place of Code in the Dark Competition",
            organization: "RISTEK Fasilkom UI",
            period: "Nov 2023",
            description: "Developed frontend side of a web without being allowed to look at the preview within an hour."
        },
        {
            title: "Best Member of People Operations for Q1",
            organization: "RISTEK Fasilkom UI",
            period: "Jun 2023",
            description: "Assisted Network, Security, and OS SIG of RISTEK Fasilkom UI with their operationals. Helped RISTEK Fasilkom UI with their internal events."
        },
        {
            title: "AISEC UI Best Member of February 2023",
            organization: "AIESEC Universitas Indonesia",
            period: "Feb 2023",
            description: "Developed the existing performance measurement system by using excel to improve efficiency and accuracy."
        },
    ];

    // Tab component for section navigation
    const TabButton = ({ text, isActive, onClick }) => {
        return (
            <button 
                className={`px-4 py-2 text-base font-medium transition-colors duration-200 ${
                    isActive 
                        ? "bg-black text-white" 
                        : "bg-white bg-opacity-50 hover:bg-opacity-70"
                }`}
                onClick={onClick}
            >
                {text}
            </button>
        );
    };

    // Education card
    const EducationCard = ({ institution, degree, period, description }) => {
        return (
            <div className="w-full mb-6 border-l-4 border-black bg-white bg-opacity-50 rounded overflow-hidden">
                <div className="p-4">
                    <h3 className="text-xl font-bold">{degree}</h3>
                    <h4 className="text-lg font-semibold">{institution}</h4>
                    <p className="text-sm italic mb-2">{period}</p>
                    <p>{description}</p>
                </div>
            </div>
        );
    };

    // Experience card with skills
    const ExperienceCard = ({ title, company, organization, period, description, skills, link }) => {
        return (
            <div className="w-full mb-6 border-l-4 border-black bg-white bg-opacity-50 rounded overflow-hidden">
                <div className="p-4">
                    <h3 className="text-xl font-bold">{title}</h3>
                    <h4 className="text-lg font-semibold">{company || organization}</h4>
                    <p className="text-sm italic mb-2">{period}</p>
                    <p className="mb-3">{description}</p>
                    {skills && skills.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                            {skills.map((skill, index) => (
                                <span key={index} className="px-2 py-1 text-xs bg-black text-white rounded">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    )}
                    {link && link !== "#" && (
                        <a 
                            href={link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-block mt-3 text-sm font-semibold underline"
                        >
                            View Project
                        </a>
                    )}
                </div>
            </div>
        );
    };

    // Achievement card
    const AchievementCard = ({ title, organization, period, description }) => {
        return (
            <div className="w-full mb-6 border-l-4 border-black bg-white bg-opacity-50 rounded overflow-hidden">
                <div className="p-4">
                    <h3 className="text-xl font-bold">{title}</h3>
                    <h4 className="text-lg font-semibold">{organization}</h4>
                    <p className="text-sm italic mb-2">{period}</p>
                    <p>{description}</p>
                </div>
            </div>
        );
    };

    // Determine which data to display based on active section
    const renderContent = () => {
        switch(activeSection) {
            case "Education":
                return (
                    <div className={`grid ${!isSmall ? 'grid-cols-2 gap-6' : 'grid-cols-1 gap-4'}`}>
                        {education.map((item, index) => (
                            <EducationCard key={index} {...item} />
                        ))}
                    </div>
                );
            case "Formal Experience":
                return (
                    <div className={`grid ${!isSmall ? 'grid-cols-2 gap-6' : 'grid-cols-1 gap-4'}`}>
                        {formalExperience.map((item, index) => (
                            <ExperienceCard key={index} {...item} />
                        ))}
                    </div>
                );
            case "Organizational Experience":
                return (
                    <div className={`grid ${!isSmall ? 'grid-cols-2 gap-6' : 'grid-cols-1 gap-4'}`}>
                        {organizationalExperience.map((item, index) => (
                            <ExperienceCard key={index} {...item} />
                        ))}
                    </div>
                );
            case "Projects":
                return (
                    <div className={`grid ${!isSmall ? 'grid-cols-2 gap-6' : 'grid-cols-1 gap-4'}`}>
                        {projects.map((item, index) => (
                            <ExperienceCard key={index} {...item} />
                        ))}
                    </div>
                );
            case "Achievements":
                return (
                    <div className={`grid ${!isSmall ? 'grid-cols-2 gap-6' : 'grid-cols-1 gap-4'}`}>
                        {achievements.map((item, index) => (
                            <AchievementCard key={index} {...item} />
                        ))}
                    </div>
                );
            default:
                return null;
        }
    };

    // Reset scroll position when tab changes
    useEffect(() => {
        // Scroll container to top when changing sections
        const container = document.querySelector('.content-scroll-container');
        if (container) {
            container.scrollTop = 0;
        }
    }, [activeSection]);

    // This component completely restructures the mobile view
    // Instead of having the tabs inside the scrollable area, we keep them fixed at the top
    if(isSmall){
        return(
            <div className="bg-transparent h-svh w-full px-8 py-8">
                <style>{scrollbarHideStyles}</style>
                <div className="h-full w-full flex flex-col rounded border-2 border-black bg-[#B5DFCA]">
                    {/* Fixed header with title */}
                    <div className="w-full border-b-4 border-black px-4 py-4 pt-14">
                        <h1 className="text-3xl font-bold">Experiences</h1>
                        <p className="text-lg">Professional, Non-Professional, and Achievements</p>
                    </div>
                    
                    {/* Fixed tab navigation */}
                    <div className="w-full border-b-2 border-black bg-[#B5DFCA] px-1 py-2 overflow-x-auto no-scrollbar">
                        <div ref={tabsContainerRef} className="flex space-x-1 min-w-max">
                            <TabButton 
                                text="Education" 
                                isActive={activeSection === "Education"} 
                                onClick={() => setActiveSection("Education")} 
                            />
                            <TabButton 
                                text="Formal Experience" 
                                isActive={activeSection === "Formal Experience"} 
                                onClick={() => setActiveSection("Formal Experience")} 
                            />
                            <TabButton 
                                text="Organizational Experience" 
                                isActive={activeSection === "Organizational Experience"} 
                                onClick={() => setActiveSection("Organizational Experience")} 
                            />
                            <TabButton 
                                text="Projects" 
                                isActive={activeSection === "Projects"} 
                                onClick={() => setActiveSection("Projects")} 
                            />
                            <TabButton 
                                text="Achievements" 
                                isActive={activeSection === "Achievements"} 
                                onClick={() => setActiveSection("Achievements")} 
                            />
                        </div>
                    </div>
                    
                    {/* Scrollable content area */}
                    <div className="flex-1 overflow-y-auto no-scrollbar content-scroll-container px-4 py-4 pb-8">
                        <h2 className="text-2xl font-bold mb-4 border-b-2 border-black pb-2">{activeSection}</h2>
                        {renderContent()}
                    </div>
                </div>
            </div>            
        );
    } else {
        return(
            <div className="bg-transparent h-svh w-full px-8 py-8">
                <style>{scrollbarHideStyles}</style>
                <div className="h-full w-full flex items-center justify-center rounded border-2 border-black px-1 py-1 bg-[#B5DFCA]">
                    <div className="flex flex-col items-start justify-start h-full w-4/5 overflow-y-auto no-scrollbar py-20 px-6">
                        <div className="w-full border-b-4 border-black mb-8">
                            <h1 className="text-5xl font-bold">Experiences</h1>
                            <p className="text-xl mb-2">Professional, Non-Professional, and Achievements</p>
                        </div>
                        
                        {/* Section tabs - desktop version */}
                        <div className="w-full flex mb-8 space-x-1">
                            <TabButton 
                                text="Education" 
                                isActive={activeSection === "Education"} 
                                onClick={() => setActiveSection("Education")} 
                            />
                            <TabButton 
                                text="Formal Experience" 
                                isActive={activeSection === "Formal Experience"} 
                                onClick={() => setActiveSection("Formal Experience")} 
                            />
                            <TabButton 
                                text="Organizational Experience" 
                                isActive={activeSection === "Organizational Experience"} 
                                onClick={() => setActiveSection("Organizational Experience")} 
                            />
                            <TabButton 
                                text="Projects" 
                                isActive={activeSection === "Projects"} 
                                onClick={() => setActiveSection("Projects")} 
                            />
                            <TabButton 
                                text="Achievements" 
                                isActive={activeSection === "Achievements"} 
                                onClick={() => setActiveSection("Achievements")} 
                            />
                        </div>
                        
                        {/* Content section */}
                        <div className="w-full">
                            <h2 className="text-2xl font-bold mb-6 border-b-2 border-black pb-2">{activeSection}</h2>
                            {renderContent()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Experience;