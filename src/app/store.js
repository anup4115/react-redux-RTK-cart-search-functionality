import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { productApi } from "../services/productApi";
import cartReducer from "../services/cartSlice";
import searchReducer from "../services/searchSlice";
export const store=configureStore({
    reducer:{
        search:searchReducer,
        cart:cartReducer,
        [productApi.reducerPath]:productApi.reducer
    },
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware().concat(productApi.middleware)
})

setupListeners(store.dispatch)