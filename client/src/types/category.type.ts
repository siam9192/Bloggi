import { IBlog } from "./blog.type";

export interface ICategory {
  id: number;
  name: string;
  slug: string;
  hierarchyString: string;
  image_url?: string;
  description: string;
  parent_id?: number;
  is_featured: boolean;

  parent?: ICategory;
  children?: ICategory[];
  blogs?: IBlog[];
  created_at: string;
  update_at: string;
}

export interface IRetrieveCategory {
  id: number;
  name: string;
  slug: string;
  hierarchyString: string;
  created_at?: string;
  updated_at?: string;
}
