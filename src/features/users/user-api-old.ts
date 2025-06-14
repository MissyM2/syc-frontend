import { MongoClient } from 'mongodb';
import axios, { type AxiosResponse, AxiosError, isAxiosError } from 'axios';
import type { User, LoginUser } from '../../interfaces/Interfaces.tsx';
import type { MyErrorType } from '../../types/Types.tsx';

// /api/new-user
// POST /api/new-user

// interface PostResponse {
//   id: number;
//   message: string;
// }

export async function getUser(id: number) {
  //"http://localhost:3000/syc/users/12345"
  const response = await axios.get(`${URL}/syc/users/${id}`);

  const user: User = response.data;
  // const data = await getImage(user.imageId);
  // user.image = data;
  return user;
}

// export async function createUser(user: User) {
//   console.log(user);
//   //const data = await createImage(user.file);
//   // const imageId = user.file.name;

//   // user.imageId = imageId;

//   //"http://localhost:3000/syc/users"
//   const response = await axios.post(`${URL}/syc/users`, user);
//   return response;
// }

export async function updateUser(id: number, user: User) {
  //"http://localhost:3000/syc/users/12345"
  const response = await axios.put(`${URL}/syc/users/${id}`, user);
  return response;
}

export async function deleteUser(id: number) {
  //"http://localhost:3000/syc/users/12345"
  const response = await axios.delete(`${URL}/syc/users/${id}`);
  return response;
}

export async function verifyUser(user: LoginUser) {
  const response: AxiosResponse = await axios.post(
    `${URL}/syc/users/login`,
    user
  );

  if (response.data.success) {
    return response.data.token;
  } else {
    return;
    //throw new Error(response.statusText);
  }
}
