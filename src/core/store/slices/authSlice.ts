import { createSlice } from "@reduxjs/toolkit"; 

interface Address {
  flatNumber: string;
  wing: string;
  society: string;
}

const initialState: {
  user: object | null;
  userAddresses: Address[];
} = {
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '{}') : null,
  userAddresses: localStorage.getItem('userAddresses')
    ? JSON.parse(localStorage.getItem('userAddresses') || '[]')
    : [],
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    setAddress: (state, action) => {
      if (Array.isArray(action.payload)) {
        state.userAddresses = action.payload;
        localStorage.setItem('userAddresses', JSON.stringify(action.payload));
        return;
      }

      const addressExists = state.userAddresses.some(
        addr => addr.flatNumber === action.payload.flatNumber && 
                addr.wing === action.payload.wing && 
                addr.society === action.payload.society
      );
      
      if (!addressExists) {
        state.userAddresses = [...state.userAddresses, action.payload];
        localStorage.setItem('userAddresses', JSON.stringify(state.userAddresses));
      }
    },
    removeAddress: (state, action) => {
      state.userAddresses = state.userAddresses.filter(addr => 
        !(addr.flatNumber === action.payload.flatNumber &&
          addr.wing === action.payload.wing &&
          addr.society === action.payload.society)
      );
      localStorage.setItem('userAddresses', JSON.stringify(state.userAddresses));
    },
    clearAddresses: (state) => {
      state.userAddresses = [];
      localStorage.removeItem('userAddresses');
    },
    logout: (state) => {
      state.user = null;
      state.userAddresses = [];
      localStorage.removeItem('user');
      localStorage.removeItem('userAddresses');
      sessionStorage.removeItem('user');
    },
  },
});

export const { setAuth, setAddress, removeAddress, clearAddresses, logout } = authSlice.actions;
export default authSlice.reducer;