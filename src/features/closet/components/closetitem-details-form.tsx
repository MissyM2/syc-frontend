// src/components/PersonalInfoForm.tsx
import React from 'react';
import { useFormContext } from 'react-hook-form';

import {
  categoryItems,
  // seasonItems,
  sizeItems,
  colorItems,
  occasionTypes,
  ratingItems,
} from '@/features/closet/Closetitem-datas';
import ClosetitemDropdownBox from './closetitem-dropdown-box';

export const ItemDetailsForm: React.FC = () => {
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
      {/* <div className="flex justify-between p-0">
        <Label
          className="text-gray-700 text-xs"
          htmlFor="{closetitem.itemDetails.seasons.join(', ')}"
        >
          Seasons
        </Label>
        <FormField
          control={control}
          name="itemDetails.seasons"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl className="text-xs md:text-sm text-muted-foreground">
                  <SelectTrigger className="border-none outline-none shadow-none focus:ring-0 focus:ring-offset-0 p-0">
                    <SelectValue className="" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="">
                  {seasonItems.map((item) => (
                    <SelectItem
                      className="text-xs md:text-sm"
                      key={item.value}
                      value={item.value}
                    >
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div> */}

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
