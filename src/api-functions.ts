import axios, { isAxiosError } from 'axios';
import type { AxiosResponse, AxiosError } from 'axios';

const URL = 'http://localhost:3000';

interface User {
  name: string;
  emailAddress: string;
}

interface Closetitem {
  category: string;
  name: string;
  season: string;
  size: string;
  desc: string;
  rating: string;
}

export type TUserList = User[];
export type TClosetitemList = Closetitem[];

type MyErrorType = {
  status: string;
  message: string;
  type: string;
  errors: string[];
};

export const getUsers = async () => {
  //"http://localhost:3000/syc/users"
  try {
    const response = await axios.get<TUserList>(`${URL}/syc/users`);
    console.log(response);
    if (response.status !== 200) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const users = await response.data;
    return users;
  } catch (error) {
    if (isAxiosError(error)) {
      const err: AxiosError<MyErrorType> = error;
      console.error('Fetching users failed:', err.response?.data.message);
      throw error;
    }
  }
};

export async function getUser(id: number) {
  //"http://localhost:3000/syc/users/12345"
  const response = await axios.get(`${URL}/syc/users/${id}`);

  const user: User = response.data;
  // const data = await getImage(user.imageId);
  // user.image = data;
  return user;
}

export async function createUser(user: User) {
  console.log(user);
  //const data = await createImage(user.file);
  // const imageId = user.file.name;

  // user.imageId = imageId;

  //"http://localhost:3000/syc/users"
  const response = await axios.post(`${URL}/syc/users`, user);
  return response;
}

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

// closetitem functions
export const getClosetitems = async () => {
  //"http://localhost:3000/syc/closetitemss"
  try {
    const response = await axios.get<TClosetitemList>(`${URL}/syc/closetitems`);
    console.log(response);
    if (response.status !== 200) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const closetitemss = await response.data;
    return closetitemss;
  } catch (error) {
    if (isAxiosError(error)) {
      const err: AxiosError<MyErrorType> = error;
      console.error(
        'Fetching closetitemss failed:',
        err.response?.data.message
      );
      throw error;
    }
  }
};

export async function getClosetitem(id: number) {
  //"http://localhost:3000/syc/users/12345"
  const response = await axios.get(`${URL}/syc/closetitems/${id}`);

  const closetitem: Closetitem = response.data;
  // const data = await getImage(user.imageId);
  // user.image = data;
  return closetitem;
}

export async function createClosetitems(closetitems: Closetitems) {
  console.log(closetitems);
  //const data = await createImage(user.file);
  // const imageId = user.file.name;

  // user.imageId = imageId;

  //"http://localhost:3000/syc/closetitemss"
  const response = await axios.post(`${URL}/syc/closetitems`, closetitems);
  return response;
}

export async function updateClosetitem(id: number, closetitem: User) {
  //"http://localhost:3000/syc/closetitems/12345"
  const response = await axios.put(`${URL}/syc/closetitems/${id}`, closetitem);
  return response;
}

export async function deleteClosetitem(id: number) {
  //"http://localhost:3000/syc/closetitems/12345"
  const response = await axios.delete(`${URL}/syc/closetitems/${id}`);
  return response;
}
