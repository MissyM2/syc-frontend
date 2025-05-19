import { useState, useEffect } from 'react';
//import { getClosetitems } from '../api-functions';
import { ClosetitemCard } from '../components/ClosetitemCard.tsx';
import axios from 'axios';

const URL = 'http://localhost:3000';

interface ClosetitemType {
  _id: string;
  category: string;
  name: string;
  season: string;
  size: string;
  desc: string;
  rating: string;
}

export type TClosetitemList = ClosetitemType[];

export const HomePage: React.FC = () => {
  const [closetitems, setClosetitems] = useState<ClosetitemType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAllClosetitems = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get<TClosetitemList>(
          `${URL}/syc/closetitems`
        );
        setClosetitems(response.data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    loadAllClosetitems();
  }, []);

  if (loading) {
    return <p>Loading data...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      {closetitems.map((closetitem) => (
        <ClosetitemCard closetitem={closetitem} />
      ))}
    </>
  );
};
