export const loadFonts = (titleFontUrl: string | undefined, bodyFontUrl: string | undefined) => {
    const existingLinks = document.querySelectorAll('link[data-font]');
    existingLinks.forEach(link => link.remove()); // Remove fontes antigas para evitar duplicação

    const fonts = [titleFontUrl, bodyFontUrl];

    fonts.forEach(fontUrl => {
        if (fontUrl) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = fontUrl;
            link.setAttribute('data-font', 'true'); // Marca para remoção futura
            document.head.appendChild(link);
        }
    });
};
