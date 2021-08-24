import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    login: "",
    email: "",
    token: "",
    isLoggedIn: false,
  },
  reducers: {
    logInUser: (state, action) => {
      state.token = action.payload.token;
      state.login = action.payload.login;
      state.email = action.payload.email;
      state.isLoggedIn = true;
    },

    logOutUser: (state) => {
      state.login = "";
      state.email = "";
      state.token = "";
      state.isLoggedIn = false;
    },
  },
});

export const { logInUser, logOutUser } = userSlice.actions;
export default userSlice.reducer;
