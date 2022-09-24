import React, { useEffect, useState } from 'react';
import api from '@src/services/apiService';

export default function App() {
  const [title, setTitle] = useState('empty');

  useEffect(() => {
    const getData = async () => {
      const response = await api.get(
        'https://songbook-backend-production.up.railway.app/other'
      );
      return response;
    };

    getData()
      .then((data) => {
        if (data) setTitle(data[0].title);
      })
      .catch((e: Error) => {
        console.log(e.message);
        setTitle('error');
      });
  }, []);

  return (
    <div>
      <React.StrictMode>
        <>Hello world </>
        {title}
      </React.StrictMode>
    </div>
  );
}
