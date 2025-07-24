export interface Closetitem {
  presignedUrl: any;
  _id: string;
  category: string;
  itemName: string;
  season: string;
  size: string;
  desc: string;
  rating: string;
  imageUrl: string;
  imagePresignedUrl: string;
  imageId: string;
  userId: string;
}

export interface ClosetState {
  closetitems: Closetitem[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  success: boolean;
}

export interface DeleteClosetitemArgs {
  userId: string;
  closetitemId: string;
  imageId: string;
}
