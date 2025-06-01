import axios from 'axios';
import { MongoClient } from 'mongodb';

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
