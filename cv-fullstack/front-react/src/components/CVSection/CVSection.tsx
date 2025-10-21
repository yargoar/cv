import React, { useState, useId } from 'react';
import styles from './CVSection.module.css';

interface CVSectionProps {
    section: {
        name: string;
        content: any;
    };
}

const CVSection: React.FC<CVSectionProps> = ({ section }) => {
    const [isOpen, setIsOpen] = useState(true);
    const triggerId = `${useId()}-trigger`;
    const contentId = `${useId()}-content`;

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    const renderContent = () => {
        switch (section.content.type) {
            case 'text_block':
                return <p>{section.content.text}</p>;
            case 'simple_list':
                return (
                    <ul>
                        {section.content.items.map((item: any, index: number) => (
                            <li key={index}>
                                <h3>{item.name} <span>{item.complement && `// ${item.complement}`}</span></h3>
                                {item.description && <div>{item.description}</div>}
                            </li>
                        ))}
                    </ul>
                );
            case 'complex_list':
                return (
                    <ul>
                        {section.content.items.map((item: any, index: number) => (
                            <li key={index}>
                                <a href={item.link} target="_blank" rel="noopener noreferrer">
                                    {item.name}
                                </a>
                                - {item.description}
                            </li>
                        ))}
                    </ul>
                );
            case 'experience_list':
                return (
                    <ul>
                        {section.content.items.map((item: any, index: number) => (
                            <li key={index}>
                                <h3>
                                    {item.name} <span>//{item.company} - {item.period}</span>
                                </h3>
                                <ul>
                                    {item.tasks.map((task: any, i: number) => (
                                        <li key={i}>
                                            {task}
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                );
            case 'nested_list':
                return (
                    <div>
                        {section.content.items.map((item: any, index: number) => (
                            <div key={index}>
                                <h3>{item.name}</h3>
                                <ul>
                                    {item.items.map((subItem: string, subIndex: number) => (
                                        <li key={subIndex}>{subItem}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <section className={`${styles.section
            } ${styles[section.content.type]}`} >
            <h2 className={`${styles.h2} ${isOpen ? styles.active : ''}`}>
                <button
                    id={triggerId}
                    className={styles.accordionButton}
                    onClick={toggleAccordion}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            toggleAccordion();
                        }
                    }}
                    aria-expanded={isOpen}
                    aria-controls={contentId}
                >
                    {section.name}
                </button>
            </h2>
            <div id={contentId}
                role="region"
                aria-labelledby={triggerId}
                className={`${styles.accordion_content} ${isOpen ? styles.open : ''}`}
                aria-hidden={!isOpen}>
                {renderContent()}
            </div>
        </section>
    );
};

export default CVSection;