export const fetchCVData = async (lang: string) => {
    console.log(import.meta.env.VITE_API_URL);  // Verifique o valor da variável aqui
    const apiUrl = `${import.meta.env.VITE_API_URL}${lang}`;
    if (!apiUrl) {
        throw new Error('Variável de ambiente VITE_API_URL não definida.');
    }

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao buscar dados do CV:', error);
        throw error;
    }
};
