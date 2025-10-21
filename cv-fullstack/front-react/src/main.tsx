import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './stores/store';
import App from './App';
import './reset.css';
import './index.css';

document.documentElement.style.setProperty('--primary-color', import.meta.env.VITE_APP_PRIMARY_COLOR);
document.documentElement.style.setProperty('--secondary-color', import.meta.env.VITE_APP_SECONDARY_COLOR);
document.documentElement.style.setProperty('--background-color', import.meta.env.VITE_APP_BACKGROUND_COLOR);
document.documentElement.style.setProperty('--text-color', import.meta.env.VITE_APP_TEXT_COLOR);
document.documentElement.style.setProperty('--font-title', import.meta.env.VITE_APP_FONT_TITLE);
document.documentElement.style.setProperty('--font-body', import.meta.env.VITE_APP_FONT_BODY);

const loadFonts = (titleFontUrl: string | undefined, bodyFontUrl: string | undefined) => {
  const existingLinks = document.querySelectorAll('link[data-font]');
  existingLinks.forEach(link => link.remove());

  const fonts = [titleFontUrl, bodyFontUrl];

  fonts.forEach(fontUrl => {
    if (fontUrl) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = fontUrl;
      link.setAttribute('data-font', 'true');
      document.head.appendChild(link);
    }
  });
};

loadFonts(import.meta.env.VITE_APP_FONT_TITLE_URL, import.meta.env.VITE_APP_FONT_BODY_URL);

const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );
} else {
  console.error('Elemento #root não encontrado no DOM.');
}