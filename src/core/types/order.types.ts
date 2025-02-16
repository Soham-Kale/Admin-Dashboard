export interface Order {
    _id: string;
    user: {
      name: string;
    };
    orderItems: OrderItem[];
    deliveryStatus: string;
    createdAt: string;
    totalPrice: number;
    isPaid: boolean;
    paidAt?: string;
    isDelivered: boolean;
    deliveredAt?: string;
  }
  
  export interface OrderItem {
    _id: string;
    name: string;
    qty: number;
    image: string;
    price: number;
    product: string;
  }