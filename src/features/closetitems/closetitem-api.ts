import axios from 'axios';
import { MongoClient } from 'mongodb';

import type { Closetitem } from '../interfaces/Interfaces.tsx';

// /api/new-closetitem
// POST /api/new-closetitem
const URL = 'http://localhost:3000';

export type TClosetitemList = Closetitem[];

// async function handler(req, res) {
//   if (req.method === 'POST') {
//     const data = req.body;

//     const client = await MongoClient.connect(
//       'mongodb+srv://fdmaloney:Daisl9515$!#@@fdmclustersandbox.0zdlunl.mongodb.net/syc-backend?retryWrites=true&w=majority&appName=FDMClusterSandbox'
//     );

//     const db = client.db();
//     const closetitemsCollection = db.collection('closetitems');
//     const result = await closetitemsCollection.insertOne(data);

//     console.log(result);

//     client.close();

//     res.status(201).json({ message: 'Closetitem added!' });
//   }
// }

export async function getAllClosetitems() {
  const response = await axios.get<TClosetitemList>(`${URL}/syc/closetitems`);
  if (response.status === 200) {
    return response.data;
  } else {
    return;
  }
}

export async function createClosetitem(closetitem: Closetitem) {
  console.log(closetitem);
  //const data = await createImage(closetitem.file);
  //const imageId = closetitem.file.name;

  //closetitem.imageId = imageId;

  //"http://localhost:3000/closetitems"
  const response = await axios.post(`${URL}/syc/closetitems`, closetitem);
  return response;
}

export async function createImage(file) {
  const formData = new FormData();
  formData.append('image', file);
  const response = await axios.post(`${URL}/images`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response;
}

export async function getImage(id) {
  const response = await axios.get(`${URL}/images/${id}`);
  return response;
}
