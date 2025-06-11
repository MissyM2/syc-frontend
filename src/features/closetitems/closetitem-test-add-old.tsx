import React from 'react';

import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// import { zodResolver } from '@hookform/resolvers/zod';
// import { useForm } from 'react-hook-form';
// import { z } from 'zod';

import { Input } from '../../components/ui/input.tsx';
import { Button } from '../../components/ui/button.tsx';
import { Label } from '../../components/ui/label.tsx';
//import { Textarea } from '../../components/ui/textarea.tsx';

import { createClosetitem } from './closetitem-api.ts';

// interface Props {
//   onSubmit: (data: FormValues) => void;
// }
interface MyFormData {
  category: string;
  name: string;
  season: string;
  size: string;
  desc: string;
  rating: string;
  dateCreated: Date;
  imageId: string;
  imageFile?: File;
  items?: number[];
}

export const ClosetItemAddPage: React.FC<MyFormData> = () => {
  const [formData, setFormData] = useState<MyFormData>({
    category: '',
    name: '',
    season: '',
    size: '',
    desc: '',
    rating: '',
    imageId: '',
    dateCreated: new Date(),
  });

  const navigate = useNavigate();

  //const MAX_FILE_SIZE = 15000000;

  const fileInputRef = useRef<HTMLInputElement>(null);
  const currDate = new Date();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // if (event.target.files && event.target.files.length > 0) {
    //   setImageFile(event.target.files[0]);
    // } else {
    //   setImageFile(null);
    // }
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, imageFile: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = new FormData();
    form.append('category', formData.category);
    form.append('name', formData.name);
    form.append('season', formData.season);
    form.append('size', formData.size);
    form.append('desc', formData.desc);
    form.append('rating', formData.rating);
    form.append('dateCreated', currDate.toDateString());

    if (formData.imageFile) {
      form.append('imageFile', formData.imageFile);
      form.append('imageId', '');
    }

    if (formData.items) {
      form.append('items', JSON.stringify(formData.items));
    }

    try {
      const response = await createClosetitem(formData);
      if (response) {
        navigate('/home');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   console.log('instide handlefileupload' + JSON.stringify(e));
  //   if (!e.target.files || e.target.files.length === 0) {
  //     // Handle the case where no files are selected or files is null
  //     console.warn('No files selected or files array is null.');
  //     return;
  //   }

  //   if (inputFile.current == null) {
  //     // Handle the case where no files are selected or files is null
  //     console.warn('No image selected.');
  //     return;
  //   }

  //   const imageFile = e.target.files[0];
  //   console.log('what is imageFile? +' + JSON.stringify(imageFile));
  //   const fileExtension = imageFile.name.substring(
  //     imageFile.name.lastIndexOf('.')
  //   );
  //   if (
  //     fileExtension != '.jpg' &&
  //     fileExtension != '.jpeg' &&
  //     fileExtension != '.png'
  //   ) {
  //     alert('Files must be jpg or png');
  //     inputFile.current.value = '';
  //     inputFile.current.type = 'file';
  //     return;
  //   }
  //   if (imageFile.size > MAX_FILE_SIZE) {
  //     alert('File size exceeds the limit (15 Mb)');
  //     inputFile.current.value = '';
  //     inputFile.current.type = 'file';
  //     return;
  //   }

  //   setImageFile(imageFile);

  //   console.log('before setFile: what is file? ' + JSON.stringify(imageFile));
  // };

  return (
    <div className="grid grid-flow-row w-full justify-items-center">
      <h1 className="text-center text-xl lg:text-3xl mb-2 lg:mb-3">
        Please add your info on the closet item here.
      </h1>
      <form onSubmit={handleSubmit}>
        <Label className="flex left-0 p-2">Category: </Label>
        <Input
          onChange={handleInputChange}
          maxLength={10}
          required
          name="category"
          value={formData.category}
        />
        <Label className="flex left-0 p-2">Name: </Label>
        <Input
          onChange={handleInputChange}
          maxLength={20}
          required
          name="name"
          value={formData.name}
        />
        <Label className="flex left-0 p-2">Season: </Label>
        <Input
          onChange={handleInputChange}
          maxLength={50}
          required
          name="season"
          value={formData.season}
        />
        <Label className="flex left-0 p-2">Size: </Label>
        <Input
          onChange={handleInputChange}
          maxLength={100}
          required
          name="size"
          value={formData.size}
        />
        <Label className="flex left-0 p-2">Desc: </Label>
        <input
          onChange={handleInputChange}
          maxLength={20}
          required
          name="desc"
          value={formData.desc}
        />
        <Label className="flex left-0 p-2">Rating </Label>
        <Input
          onChange={handleInputChange}
          maxLength={5}
          required
          name="rating"
          value={formData.rating}
        />
        <Label className="flex left-0 p-2">Insert Header Image: </Label>
        <input
          type="file"
          onChange={handleFileChange}
          ref={fileInputRef}
          className="cursor-pointer hover:bg-accent"
          required
        />

        {/* <Input
          type="file"
          onChange={handleFileUpload}
          ref={inputFile}
          className="cursor-pointer hover:bg-accent"
          required
        /> */}
        <Button type="submit" className="mt-4">
          Submit
        </Button>
      </form>

      {/* {imageFile && (
        <div>
          <p>File Name: {imageFile.name}</p>
          <p>File Size: {imageFile.size} bytes</p>
          <p>File Type: {imageFile.type}</p>
        </div>
      )} */}
    </div>
  );
};
