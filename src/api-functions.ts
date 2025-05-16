import axios, { isAxiosError } from 'axios';
import type { AxiosResponse, AxiosError } from 'axios';

const URL = 'http://localhost:3000';

interface User {
  name: string;
  emailAddress: string;
}

export type TUserList = User[];

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
// export async function getUsers() {
//   //"http://localhost:3000/syc/users"
//   const response = await axios.get(`${URL}/syc/users`);

//   if (response.status === 200) {
//     return response.data;
//   } else {
//     return;
//   }
// }

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
