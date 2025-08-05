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

export interface ClosetitemDetails {
  category: string;
  seasons: string[];
  size: string;
  color: string;
  occasion: string;
  rating: string;
}

export interface Closetitem {
  _id: string;
  closetType: string;
  itemName: string;
  itemDetails: ClosetitemDetails;
  additionalDesc: string;
  imageId: string;
  imageFile: FileList;
  imageUrl: string;
  userId: string;
  // createdAt: string;
  // updatedAt: string;
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
