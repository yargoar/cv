import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/stores/store';
import styles from './CVHeader.module.css';
import AccessibilityToggler from '..//AccessibilityToggler';
import LanguageSelector from '../LanguageSelector';
import Contact from '../Contact';

const CVHeader: React.FC = () => {
    const cvData = useSelector((state: RootState) => state.cv.data);
    if (!cvData || Object.keys(cvData).length === 0) {
        return <p>Carregando...</p>;
    }
    return (
        <header className={styles.header}>
            <AccessibilityToggler />
            <LanguageSelector />
            <h1>{cvData.name} <span>//{cvData.profession}</span></h1>

            <div id="contact" className={styles.contact}>
                <ul>
                    {cvData.contact.map((contact: any, index: number) => (
                        <Contact key={index} contact={contact} />
                    ))}
                </ul>
            </div>
        </header>
    );
};

export default CVHeader;