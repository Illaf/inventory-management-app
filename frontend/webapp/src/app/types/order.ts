export interface OrderItem {
    product: string;
    name: string;
    quantity: number;
    price: number;
  }
  
  export interface Order {
    _id: string;
    user?: {
      _id: string;
      name: string;
      email?: string;
    };
    items: OrderItem[];
    total: number;
    status?: 'pending' | 'approved' | 'rejected' | string;
    notified: boolean;
    placedAt: Date;
  }