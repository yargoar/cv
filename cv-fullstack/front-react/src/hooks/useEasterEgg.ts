import { useState, useEffect } from 'react';

const useEasterEgg = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleEasterEgg = (event: Event) => {


            const alreadyExecutedHere = Boolean(localStorage.getItem('ee'));
            if (alreadyExecutedHere) {
                return;
            }
            const customEvent = event as CustomEvent;
            const chance = customEvent.detail?.chance || .2;
            const possibility = Math.round(Math.random() * 100) / 100;
            const decision = possibility < chance;

            if (!decision) {
                return;
            }
            setIsVisible(true);
            localStorage.setItem('ee', ".");

            const timer = setTimeout(() => {
                setIsVisible(false);
            }, 4500);

            return () => clearTimeout(timer);
        };

        window.addEventListener('triggerEE', handleEasterEgg);

        return () => {
            window.removeEventListener('triggerEE', handleEasterEgg);
        };
    }, []);

    return { isVisible };
};

export default useEasterEgg;
