import axios from 'axios';
import { MongoClient } from 'mongodb';

import type { Closetitem } from '../../interfaces/Interfaces.tsx';

// /api/new-closetitem
// POST /api/new-closetitem
const URL = 'http://localhost:3000';

export type TClosetitemList = Closetitem[];

export async function getAllClosetitems() {
  const response = await axios.get<TClosetitemList>(`${URL}/syc/closetitems`);
  if (response.status === 200) {
    return response.data;
  } else {
    return;
  }
}

export async function getClosetitem(id: string) {
  //"http://localhost:3000/posts/12345"
  const response = await axios.get(`${URL}/syc/closetitems/${id}`); // first, go get the closetitem from mongo

  const closetitem = response.data;
  const data = await getImage(closetitem.imageId);
  closetitem.image = data;
  return closetitem;
}

export async function createClosetitem(closetitem: Closetitem) {
  console.log('inside createClosetitem: ' + JSON.stringify(closetitem));
  const data = await createImage(closetitem.file);
  const imageId = data.data.VersionId; //the id of the file

  closetitem.imageId = imageId;

  //"http://localhost:3000/closetitems"
  const response = await axios.post(`${URL}/syc/closetitems`, closetitem);
  return response;
}

export async function createImage(file: string | Blob) {
  const formData = new FormData();
  formData.append('image', file);
  const response = await axios.post(`${URL}/images`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response;
}

export async function getImage(id: any) {
  const response = await axios.get(`${URL}/images/${id}`);
  return response;
}
