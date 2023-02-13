import { useState } from 'react';

// Хук, который отвечает за показ индикатора при каких-либо загрузках
// Параметр callback - это какой-то запрос, во время которого необходимо показать loader
export const useFetching = (callback) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    // Блок finally необходим, чтобы в любом случае закрыть лоадер, даже если callback запрос вернет ошибку
    const fetching = async (...args) => {
        try {
            setIsLoading(true);
            await callback(...args);
        } catch (e) {
            setError(e.message);
        } finally {
            setIsLoading(false);
        }
    }

    return [fetching, isLoading, error];
}