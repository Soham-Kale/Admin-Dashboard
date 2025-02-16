export interface CartItem {
    _id: string;
    name: string;
    image: string;
    price: number;
    qty: number;
    countInStock: number;
    category?: string;
  }
  
  export interface CartState {
    cartItems: CartItem[];
    shippingAddress: ShippingAddress;
    paymentMethod: string;
    itemsPrice: string;
    shippingPrice: string;
    taxPrice: string;
    totalPrice: string;
  }
  
  export interface ShippingAddress {
    address: string;
    city: string;
    postalCode: string;
    country: string;
  }