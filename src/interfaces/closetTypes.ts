export type TClosetitemList = IClosetitem[];

export interface ClosetitemDetails {
  category: string;
  seasons: string[];
  size: string;
  color: string;
  occasion: string;
  rating: string;
}

export interface IClosetitem {
  _id: string;
  closetType: 'personal' | 'personalOnly' | 'donation' | 'sharing';
  itemName: string;
  itemDetails: ClosetitemDetails;
  additionalDesc: string;
  imageId: string;
  imageFile: FileList;
  imageUrl: string;
  userId: string;
}

export interface IAddClosetitem extends Omit<IClosetitem, '_id'> {}

// Interface for updating an existing ClosetItem (all fields are optional as not all fields might be updated)
export interface IUpdateClosetitem extends Partial<IClosetitem> {
  updateData: IClosetitem;
  imageId: string; // The imageId is required to identify the image being updated
  //imageFile: FileList;
}

export interface IUpdateClosetitemProperty extends Partial<IClosetitem> {
  _id: string;
  property: string;
  value: string;
}

// Interface for deleting a ClosetItem
export interface IDeleteClosetitem {
  _id: string; // The ID is required to specify which item to delete.
  userId: string;
  imageId: string;
}

// Interface for reading (fetching) ClosetItems (e.g., for a single item or a list)
export interface IReadClosetitem extends Pick<IClosetitem, 'id'> {
  // If fetching a single item, just the ID is typically required
}

// For fetching a list of items (e.g., with filtering or pagination)
// Schema for reading all items (no specific input needed for this operation itself)
// This is typically handled by a function that fetches data, not a schema for input validation.
// However, if there were query parameters for filtering/pagination, a schema would be used for those.
// For example:
export interface IReadClosetitemsQueryParams {
  category?: string; // Optional filter by category
  color?: string; // Optional filter by color
  page?: number; // For pagination
  limit?: number; // For pagination
}

export interface Closet {
  closetitems: IClosetitem[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  success: boolean;
}

export interface ClosetState {
  closetitems: IClosetitem[];
  selectedClosetitemId: string | null; // ID of the currently selected closet item
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  success: boolean;
}
