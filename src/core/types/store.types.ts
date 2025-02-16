import { CartState } from './cart.types';
import { AuthState } from './user.types';

export interface RootState {
  cart: CartState;
  auth: AuthState;
}