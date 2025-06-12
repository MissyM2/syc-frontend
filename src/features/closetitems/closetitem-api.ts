import axios from 'axios';
//import { MongoClient } from 'mongodb';
import { ObjectId } from 'mongodb';

import type { Closetitem } from '../../interfaces/Interfaces.tsx';

// /api/new-closetitem
// POST /api/new-closetitem
const URL = 'http://localhost:3000';

export type TClosetitemList = Closetitem[];

export async function getAllClosetitems() {
  const response = await axios.get<TClosetitemList>(`${URL}/syc/closetitems`);
  const items = response.data;
  if (response.status === 200) {
    for (const item of items) {
      const itemImg = await getImage(item.imageId);
      item.imageFile = itemImg;
    }
  } else {
    return;
  }
  return items;
}

export async function getClosetitem(id: string) {
  console.log('inside getClosetitem');

  //"http://localhost:3000/posts/12345"
  const response = await axios.get(`${URL}/syc/closetitems/${id}`); // first, go get the closetitem from mongo

  const closetitem = response.data;
  console.log('inside getClosetitem: closetitem ' + JSON.stringify(closetitem));
  const data = await getImage(closetitem.imageId);

  closetitem.image = data;
  return closetitem;
}

interface ReceivingFormData {
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

export async function createClosetitem(closetitem: ReceivingFormData) {
  if (!closetitem.imageFile) {
    throw new Error('No file provided');
  }

  const imageId = closetitem.imageFile.name; //the id of the file
  closetitem.imageId = imageId;

  const data = await createImage(closetitem.imageFile);
  if (data != null) {
    console.log('check if image was created.');
  }
  // const imageId = closetitem.imageFile.name; //the id of the file
  // closetitem.imageId = imageId;

  // "http://localhost:3000/closetitems"

  try {
    const response = await axios.post(`${URL}/syc/closetitems`, closetitem);
    return response;
  } catch (error) {
    console.error('Error:', error);
  }
}

export async function createImage(file: string | Blob) {
  const formData = new FormData();
  formData.append('imageFile', file);

  try {
    const response = await axios.post(`${URL}/images`, formData, {
      headers: {},
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

export async function getImage(id: any) {
  const response = await axios.get(`${URL}/images/${id}`);
  return response;
}
