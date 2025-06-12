import React from 'react';
import { useForm } from 'react-hook-form';
import { CheckboxGroup } from './components/CheckboxGroup';
import { seasonItems } from './Closetitem-datas.ts';

export const CreateClosetitemPage: React.FC = () => {
  return (
    <div>
      <CheckboxGroup options={seasonItems}></CheckboxGroup>
    </div>
  );
};
