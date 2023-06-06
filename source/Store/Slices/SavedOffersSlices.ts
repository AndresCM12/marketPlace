import { createSlice } from "@reduxjs/toolkit";
import { Offer } from "../../Models";

const userSavedOffersInitialState: [Offer] = [
  {
    id: 0,
    description: "",
    price: 0,
    userId: 0,
    category: "",
    date: new Date().toISOString(),
    userName: "",
    name: "InitialState",
  },
];

export const userSavedOffersSlice = createSlice({
  name: "userSavedOffers",
  initialState: userSavedOffersInitialState,
  reducers: {
    //Add Offer to User Saved Offers
    addOfferToUserSavedOffers: (state, action) => {
      if (state[0].name === "InitialState") {
        state.pop();
      }
      state.push(action.payload);
    },
    //Remove Offer from User Saved Offers
    removeOfferFromUserSavedOffers: (state, action) => {
      state.filter((offer) => offer.id !== action.payload.id);
    },
  },
});
