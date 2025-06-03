import React from 'react';
import { Link } from 'react-router-dom';

export const AboutPage: React.FC = () => {
  return (
    <div>
      <h1>About Us</h1>
      <p>
        Welcome to Shop Your Closet! Here you will be able to upload pictures
      </p>
      <p>
        of your wardrobe to help keep track of what you have. You can compare
      </p>
      <p>
        your closet with an ideal closet and see what you need to keep and what
      </p>
      <p>
        you can get rid of. In the future, you will be able to see other
        people's
      </p>
      <p>
        closet's and share items. Start adding closet items here{' '}
        <Link to="/closetitem-add">Create an item</Link>
      </p>
      <p>Explore our content and join our community now!</p>
    </div>
  );
};
