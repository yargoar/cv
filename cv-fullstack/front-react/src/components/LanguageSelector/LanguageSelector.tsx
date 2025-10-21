import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCVData } from "../../slices/cvSlice";
import { fetchCVData } from "../../services/cvService";
import styles from './LanguageSelector.module.css';

const availableLanguages = import.meta.env.VITE_APP_LANGUAGES?.split(",") || ["en"];

const detectBrowserLanguage = () => {
    const browserLang = navigator.language.split("-")[0];
    return availableLanguages.includes(browserLang) ? browserLang : "en";
};

const LanguageSelector: React.FC = () => {
    const dispatch = useDispatch();
    const [language, setLanguage] = useState(localStorage.getItem("language") || detectBrowserLanguage());

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchCVData(language);
                dispatch(setCVData(data));
            } catch (error) {
                console.error("Erro ao carregar dados do CV:", error);
            }
        };

        loadData();
    }, [language, dispatch]);

    const handleLanguageChange = (newLanguage: string) => {
        setLanguage(newLanguage);
        localStorage.setItem("language", newLanguage);
    };

    return (
        <div className={styles.language_selector} role="group" aria-label="Selecionar idioma">
            {availableLanguages.map((lang: string) => (
                <button
                    key={lang}
                    onClick={() => handleLanguageChange(lang)}
                    aria-pressed={language === lang}
                >
                    {lang.toUpperCase()}
                </button>
            ))}
        </div>
    );
};

export default LanguageSelector;
