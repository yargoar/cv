import React, { useEffect } from 'react';
import CVHeader from './components/CVHeader';
import CVBody from './components/CVBody/CVBody';
import { useCVData } from './hooks/useCVData';
import useFavicon from "./hooks/useFavicon";
import EasterEgg from './components/EasterEgg';
import useEasterEgg from './hooks/useEasterEgg';

const App: React.FC = () => {
  // Exemplo de uso CORRETO:
const apiUrl = import.meta.env.VITE_API_URL;
console.log('API URL:', apiUrl);

  useFavicon("/favicon.png");
  useCVData('fr');

  useEffect(() => {
    document.title = import.meta.env.VITE_APP_TITLE || "Curriculum Vitae";
  }, []);

  const { isVisible } = useEasterEgg();

  useEffect(() => {
    const handleBodyClick = () => {
      const event = new CustomEvent('triggerEE', {
        bubbles: true,
        cancelable: true,
        composed: true,
        detail: { chance: .2 }
      });
      window.dispatchEvent(event);
    };

    document.body.addEventListener('click', handleBodyClick);

    return () => {
      document.body.removeEventListener('click', handleBodyClick);
    };
  }, []);

  return (
    <div>
      <CVHeader />
      <CVBody />
      <EasterEgg isVisible={isVisible} />
    </div>
  );
};

export default App;
