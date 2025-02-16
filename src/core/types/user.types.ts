import { AddressFormData } from "./address.types";

export interface User {
    _id: string;
    name: string;
    email: string;
    phoneNumber?: string;
    token: string;
    isAdmin: boolean;
    isAuth: boolean;
  }
  
  export interface AuthState {
    user: User | null;
    userAddresses: AddressFormData[];
  }