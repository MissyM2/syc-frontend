// src/components/PersonalInfoForm.tsx
import React from 'react';
import { useFormContext } from 'react-hook-form';

import {
  categoryItems,
  seasonItems,
  sizeItems,
  colorItems,
  occasionTypes,
  ratingItems,
} from '@/features/closet/Closetitem-datas';
import ClosetitemDropdownBox from './closetitem-dropdown-box';
import ClosetitemCheckboxGroup from './closetitem-checkbox-group';

export const ClosetitemDetailsForm: React.FC = () => {
  const { control } = useFormContext();

  return (
    <div className="flex flex-col gap-0">
      <ClosetitemDropdownBox
        control={control}
        name="itemDetails.category"
        label="Category"
        description="Select a category"
        items={categoryItems}
      />

      {/* Seasons */}

      <ClosetitemCheckboxGroup
        control={control}
        name="itemDetails.seasons"
        label="Seasons"
        description="Select seasons"
        items={seasonItems}
      />

      {/* Size */}
      <ClosetitemDropdownBox
        control={control}
        name="itemDetails.size"
        label="Size"
        description="Select a size"
        items={sizeItems}
      />

      {/* Color */}
      <ClosetitemDropdownBox
        control={control}
        name="itemDetails.color"
        label="Color"
        description="Select a color"
        items={colorItems}
      />

      {/* Occasion */}
      <ClosetitemDropdownBox
        control={control}
        name="itemDetails.occasion"
        label="Occasion"
        description="Select an occasion"
        items={occasionTypes}
      />

      {/* Rating */}
      <ClosetitemDropdownBox
        control={control}
        name="itemDetails.rating"
        label="Rating"
        description="Select a rating"
        items={ratingItems}
      />
    </div>
  );
};
