export interface DataType {
  [key: string]: any;
  id?: number;
  name: string;
  email: string;
  status: number;
  update_time?: string;
  create_time?: string;
}

export const NAMESPACE = 'users';
