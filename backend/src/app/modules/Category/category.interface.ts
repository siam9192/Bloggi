export interface ICreateCategoryPayload {
  parent_id?: number;
  name: string;
  is_featured: boolean;
  image_url?: string;
  children: {
    name: string;
    image_url?: string;
    isFeatured: boolean;
  }[];
}

export interface ICategoryFilterRequest {
  searchTerm?: string;
  parentId?: string | number;
}

export interface IUpdateCategoryPayload {
  id: number;
  name: string;
  is_featured: boolean;
  image_url: string;
}
