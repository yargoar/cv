import { useEffect } from "react";

const useFavicon = (faviconUrl: string) => {
    useEffect(() => {
        const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
        if (link) {
            link.href = faviconUrl;
        }
    }, [faviconUrl]);
};

export default useFavicon;
