import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../Models";

const userInitialState: User = {
  id: "",
  name: "",
  email: "",
  phone: "",
  password: "",
};
export const userSlice = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {
    //LogIn User
    setUser: (state, action) => {
      state.id = action.payload._id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.phone = action.payload.phone;
      state.password = action.payload.password;
    },
    //LogOut User
    removeUser: (state) => {
      state.id = "";
      state.name = "";
      state.email = "";
      state.phone = "";
      state.password = "";
    },
    //Update User
    updateUser: (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.phone = action.payload.phone;
      state.password = action.payload.password;
    },
  },
});
