import { useState, useEffect } from 'react';
//import { getClosetitems } from '../api-functions';
import axios from 'axios';

import clothingImg from '../assets/clothingImg.jpeg';
import ownerImg from '../assets/ownerImg.jpg';

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
    <ul>
      {closetitems.map((closetitem) => (
        <li key={closetitem._id}>
          <div className="max-w-sm w-full lg:max-w-full lg:flex mb-4">
            <div
              className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
              style={{ backgroundImage: `url(${clothingImg})` }}
              title="Princes Di"
            ></div>
            <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
              <div className="mb-8">
                <p className="text-sm text-gray-600 flex items-center">
                  <svg
                    className="fill-current text-gray-500 w-3 h-3 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
                  </svg>
                  Members only
                </p>
                <div className="text-gray-900 font-bold text-xl mb-2">
                  {closetitem.name}
                </div>
                <div className="flex flex-row gap-2">
                  <div>{closetitem.category}</div>
                  <div>{closetitem.season}</div>
                  <div>{closetitem.size}</div>
                  <div>{closetitem.rating}</div>
                </div>
                <p className="text-gray-700 text-base">{closetitem.desc}</p>
              </div>
              <div className="flex items-center">
                <img
                  className="w-10 h-10 rounded-full mr-4"
                  src={ownerImg}
                  alt="Avatar of Jonathan Reinink"
                />
                <div className="text-sm">
                  <p className="text-gray-900 leading-none">Jonathan Reinink</p>
                  <p className="text-gray-600">Aug 18</p>
                </div>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};
