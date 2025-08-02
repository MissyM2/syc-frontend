export type TClosetitemList = Closetitem[];

export interface Closet {
  closetitems: Closetitem[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  success: boolean;
}

export interface ClosetState {
  closetitems: Closetitem[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  success: boolean;
}

export interface Closetitem {
  _id: string;
  category: string;
  itemName: string;
  seasons: string[];
  size: string;
  desc: string;
  rating: string;
  imageId: string;
  image: FileList;
  imageUrl: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export type AddClosetitemArgs = Omit<Closetitem, '_id'>;

export interface ClosetDataResponse {
  closetitems: TClosetitemList;
}

export interface DeleteClosetitemArgs {
  userId: string;
  closetitemId: string;
  imageId: string;
}
