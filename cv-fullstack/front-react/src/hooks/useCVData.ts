// src/hooks/useCVData.ts
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCVData } from '../slices/cvSlice';
import { fetchCVData } from '../services/cvService';

export const useCVData = (lang: string) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const loadData = async (lang: string) => {

            try {
                const data = await fetchCVData(lang);
                dispatch(setCVData(data));
            } catch (error) {
                console.error('Erro ao carregar dados do CV:', error);
            }
        };

        loadData(lang);
    }, [dispatch]);
};