import React, { useState } from 'react';
import { UserAddPage } from '../features/users/user-add.tsx';
import { UserLoginPage } from '../features/users/user-login.tsx';
import { Button } from '../components/ui/button.tsx';

export const LandingPage: React.FC = () => {
  // view == 0 ---> Login
  // view == 1 ----> Create
  const [showUserAddPage, setShowUserAddPage] = useState<boolean>(false);

  const handleViewUpdate = (newValue: boolean) => {
    setShowUserAddPage(newValue);
  };
  return (
    <div className="bg-slate-50">
      {!showUserAddPage ? (
        <>
          <UserLoginPage onUpdate={handleViewUpdate} />
        </>
      ) : (
        <>
          <UserAddPage onUpdate={handleViewUpdate} />
        </>
      )}
    </div>
  );
};
