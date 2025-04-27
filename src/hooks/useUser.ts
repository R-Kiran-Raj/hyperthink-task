import { useState, useEffect } from 'react';
import { fetchUser } from '../services/api';

export const useUser = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const randomUserId = Math.floor(Math.random() * 10) + 1;
    
    const getUser = async () => {
      try {
        const userData = await fetchUser(randomUserId);
        setUser(userData);
      } catch (err) {
        setError('Failed to fetch user data');
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, []);

  return { user, loading, error };
};