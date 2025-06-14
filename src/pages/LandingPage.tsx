import React, { useState } from 'react';
import { RegistrationPage } from './RegistrationPage.tsx';
import { UserLoginPage } from '../features/users/user-login.tsx';
import { Button } from '../components/ui/button.tsx';

export const LandingPage: React.FC = () => {
  // view == 0 ---> Login
  // view == 1 ----> Create
  const [showRegistrationPage, setShowRegistrationPage] =
    useState<boolean>(false);

  const handleViewUpdate = (newValue: boolean) => {
    setShowRegistrationPage(newValue);
  };
  return (
    <div className="bg-slate-50">
      {!showRegistrationPage ? (
        <>
          <UserLoginPage onUpdate={handleViewUpdate} />
        </>
      ) : (
        <>
          <RegistrationPage onUpdate={handleViewUpdate} />
        </>
      )}
    </div>
  );
};
