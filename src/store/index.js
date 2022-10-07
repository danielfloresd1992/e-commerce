import { configureStore } from "@reduxjs/toolkit";
import card from "./slices/card.js";
import isLoadingSlice from "./slices/isLoading.slice.js";
import purchases from "./slices/purchases.js";


export default configureStore({
  reducer: {
    isLoading: isLoadingSlice,
    purchases: purchases,
    cardProduct: card
  }
});