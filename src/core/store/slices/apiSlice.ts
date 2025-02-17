import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../../shared/constants/constants";
  
const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const token: string = user ? user.token : null;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);  
    } 

    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["Product", "Order", "User"],
  endpoints: () => ({}),
});
