import React, { useState } from 'react';
import { UserAddPage } from '../features/users/user-add.tsx';
import { UserLoginPage } from '../features/users/user-login.tsx';
import { Button } from '../components/ui/button.tsx';

export const LandingPage: React.FC = () => {
  // view == 0 ---> Login
  // view == 1 ----> Create
  const [view, setView] = useState<boolean>(false);
  return (
    <div>
      {!view ? (
        <>
          <UserLoginPage />
          <Button onClick={() => setView(!view)}>
            Create New Account
          </Button>{' '}
        </>
      ) : (
        <>
          <UserAddPage />
          <Button onClick={() => setView(!view)}>
            Login to Existing Account
          </Button>
        </>
      )}
    </div>
  );
};
