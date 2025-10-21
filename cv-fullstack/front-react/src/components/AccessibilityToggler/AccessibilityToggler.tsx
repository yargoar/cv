import React, { useEffect, useState } from "react";
import styles from './AccessibilityToggler.module.css';
import Icon from '../Icon/Icon';

const AccessibilityToggler: React.FC = () => {
    const [isSizeEnabled, setIsSizeEnabled] = useState(false);
    const [isColorsEnabled, setIsColorsEnabled] = useState(false);
    const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(false);

    useEffect(() => {
        const htmlElement = document.documentElement;

        if (isSizeEnabled) {
            htmlElement.classList.add('accessible_size');
        } else {
            htmlElement.classList.remove('accessible_size');
        }

        if (isColorsEnabled) {
            htmlElement.classList.add('accessible_colors');
        } else {
            htmlElement.classList.remove('accessible_colors');
        }

        if (isDarkModeEnabled) {
            htmlElement.classList.add('accessible_darkmode');
        } else {
            htmlElement.classList.remove('accessible_darkmode');
        }
    }, [isSizeEnabled, isColorsEnabled, isDarkModeEnabled]);

    const toggleSize = () => setIsSizeEnabled((prev) => !prev);
    const toggleColors = () => setIsColorsEnabled((prev) => !prev);
    const toggleDarkMode = () => setIsDarkModeEnabled((prev) => !prev);

    return (
        <div className={styles.accessibility_toggler} role="group" aria-label="Accessibility options">
            <button
                onClick={toggleSize}
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault()
                        toggleSize();
                    }
                }}
                className={styles.toggle_button}
                aria-pressed={isSizeEnabled}
                aria-label={isSizeEnabled ? "Disable large text" : "Enable large text"}
            >
                <div style={{ display: isSizeEnabled ? "none" : "block" }} aria-hidden="true">
                    <Icon name="magnifying-glass-plus" prefix="fas" size="2x" />
                </div>

                <div style={{ display: isSizeEnabled ? "block" : "none" }} aria-hidden="true">
                    <Icon name="magnifying-glass-minus" prefix="fas" size="2x" />
                </div>

                <span className="sr-only">{isSizeEnabled ? "Disable Large Text" : "Enable Large Text"}</span>
            </button>

            <button
                onClick={toggleColors}
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault()
                        toggleColors();
                    }
                }}
                className={styles.toggle_button}
                aria-pressed={isColorsEnabled}
                aria-label={isColorsEnabled ? "Disable high contrast" : "Enable high contrast"}
                style={{ transform: isColorsEnabled ? "scaleX(-1)" : "none" }}
            >
                <div style={{ display: isColorsEnabled ? "none" : "block" }} aria-hidden="true">
                    <Icon name="adjust" prefix="fas" size="2x" />
                </div>

                <div style={{ display: isColorsEnabled ? "block" : "none" }} aria-hidden="true">
                    <Icon name="adjust" prefix="fas" size="2x" />
                </div>

                <span className="sr-only">{isColorsEnabled ? "Disable High Contrast" : "Enable High Contrast"}</span>
            </button>

            <button
                onClick={toggleDarkMode}
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault()
                        toggleDarkMode();
                    }
                }}
                className={styles.toggle_button}
                aria-pressed={isDarkModeEnabled}
                aria-label={isDarkModeEnabled ? "Disable dark mode" : "Enable dark mode"}
            >
                <div style={{ display: isDarkModeEnabled ? "none" : "block" }} aria-hidden="true">
                    <Icon name="moon" prefix="far" size="2x" />
                </div>

                <div style={{ display: isDarkModeEnabled ? "block" : "none" }} aria-hidden="true">
                    <Icon name="moon" prefix="fas" size="2x" />
                </div>

                <span className="sr-only">{isDarkModeEnabled ? "Disable Dark Mode" : "Enable Dark Mode"}</span>
            </button>
        </div >
    );
};

export default AccessibilityToggler;