import { useState } from "react";

export const useFetch = (callback: { (): Promise<void> }) => {
    
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const fetching = async () => {
        try {
            setIsLoading(true); 
            await callback();
        } catch(e: any) {
            setError(e.message);
            console.error('Ошибка: ', error);
        } finally {
            setIsLoading(false);
        }
    }

    return [fetching, isLoading, error] as const;
}