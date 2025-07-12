export interface Closetitem {
  _id: string;
  category: string;
  itemName: string;
  season: string;
  size: string;
  desc: string;
  rating: string;
  imageUrl: string;
  imageId?: string;
  userId: string;
}

export interface ClosetitemsState {
  closetitems: Closetitem[];
  loading: boolean;
  error: string | null;
  success: boolean;
}
