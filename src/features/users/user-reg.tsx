import { useState, useEffect } from 'react';
import axios from 'axios';

function UserRegistrationPage() {
  const [data, setData] = useState('');

  useEffect(() => {
    async function grabData() {
      const response = await axios.get(
        'http://localhost:3000/syc/users/68263e4fea86a5e3e602f793'
      );
      if (response.status === 200) {
        console.log(response);
        setData(response.data);
      }
    }
    grabData();
  }, []);

  return <>{JSON.stringify(data)}</>;
}
export default UserRegistrationPage;
