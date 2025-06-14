import React, { useState } from 'react';
import { RegistrationPage } from './RegistrationPage.tsx';
import { LoginPage } from './LoginPage.tsx';

export const LandingPage: React.FC = () => {
  const [showRegistrationPage, setShowRegistrationPage] =
    useState<boolean>(false);

  const handleViewUpdate = (newValue: boolean) => {
    setShowRegistrationPage(newValue);
  };
  return (
    <div className="bg-slate-50">
      {!showRegistrationPage ? (
        <>
          <LoginPage onUpdate={handleViewUpdate} />
        </>
      ) : (
        <>
          <RegistrationPage onUpdate={handleViewUpdate} />
        </>
      )}
    </div>
  );
};
