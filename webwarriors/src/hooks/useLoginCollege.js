// useLoginCollege.js
import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

const useLoginCollege = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useAuthContext();

    const loginAdmin = async (email, password, secretKey) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('http://localhost:5001/users/logincollege', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, secretKey })
            });

            const json = await response.json();

            if (!response.ok) {
                throw new Error(json.error || 'An error occurred during login.');
            }

            localStorage.setItem('user', JSON.stringify(json));
            dispatch({ type: 'LOGIN', payload: json });
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return { loginAdmin, isLoading, error };
};

export default useLoginCollege;
