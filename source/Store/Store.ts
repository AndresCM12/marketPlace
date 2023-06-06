import { userSavedOffersSlice } from "./Slices/SavedOffersSlices";
import { userSlice } from "./Slices/UserSlices";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    userSavedOffers: userSavedOffersSlice.reducer,
  },
});
