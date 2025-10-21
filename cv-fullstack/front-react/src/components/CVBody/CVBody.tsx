import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/stores/store';
import CVSection from '../CVSection';

const CVBody: React.FC = () => {
    const cvData = useSelector((state: RootState) => state.cv.data);
    if (!cvData || Object.keys(cvData).length === 0) {
        return <p>Carregando...</p>;
    }
    return (
        <div>
            {cvData.sections.map((section: any, index: number) => (
                <CVSection key={index} section={section} />
            ))}
        </div>
    );
};

export default CVBody;