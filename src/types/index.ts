export interface Product {
  id: string;
  name: string;
  description?: string;
  part_number?: string;
  category_id?: string;
  brand?: string; // Agora é uma string simples
  price?: number;
  stock_quantity?: number;
  is_active: boolean;
  specifications?: Record<string, any>;
  created_at: string;
  updated_at: string;
  category?: Category;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  created_at: string;
  updated_at: string;
}