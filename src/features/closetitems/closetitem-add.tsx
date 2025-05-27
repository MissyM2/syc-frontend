import React, { useState, type ChangeEvent } from 'react';
//import type { Closetitem } from '@/interfaces/Interfaces.tsx';
import { Input } from '../../components/ui/input.tsx';
import { Button } from '../../components/ui/button.tsx';
import { Label } from '../../components/ui/label.tsx';

//import { createClosetitem } from '../../api-functions.ts';

interface FormData {
  category: string;
  name: string;
  season: string;
  size: string;
  desc: string;
  rating: string;
}

export const ClosetItemAddPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    category: '',
    name: '',
    season: '',
    size: '',
    desc: '',
    rating: '',
    //file:file
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(JSON.stringify(formData));
  };

  return (
    <form onSubmit={handleSubmit} className="w-1/3">
      <Label className="flex left-0 p-2">Closetitem Category: </Label>
      <input
        type="string"
        id="category"
        name="category"
        value={formData.category}
        onChange={handleChange}
      />
      <Label className="flex left-0 p-2">Closetitem Name: </Label>
      <Input
        value={formData.name}
        onChange={handleChange}
        maxLength={40}
        required
        name="name"
      />
      <Label className="flex left-0 p-2">Closetitem Category: </Label>
      <Input
        value={formData.season}
        onChange={handleChange}
        maxLength={40}
        required
        name="season"
      />
      <Label className="flex left-0 p-2">Closetitem Category: </Label>
      <Input
        value={formData.size}
        onChange={handleChange}
        maxLength={40}
        required
        name="size"
      />
      <Label className="flex left-0 p-2">Closetitem Category: </Label>
      <Input
        value={formData.desc}
        onChange={handleChange}
        maxLength={40}
        required
        name="desc"
      />
      <Label className="flex left-0 p-2">Closetitem Category: </Label>
      <Input
        value={formData.rating}
        onChange={handleChange}
        maxLength={40}
        required
        name="rating"
      />
      {/* <Label className='flex left-0 p-2'>Item Image: </Label>
          <input type="file" value={FormData.file} onChange={handleFileUpload} ref={inputFile} className='cursor-pointer hover:bg-accent' required /> */}
      <Button type="submit" className="mt-4">
        Submit
      </Button>
    </form>
  );
};
