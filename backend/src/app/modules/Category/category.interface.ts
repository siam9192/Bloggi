export interface ICreateCategoryData {
  parent_id: number;
  name: string;
}

export interface ICategoryFilterRequest {
  searchTerm?: string;
  parentId?: string | number;
}


export interface ICreateCategoryPayload {
  name:string
  image_url?:string,
  description?:string
}