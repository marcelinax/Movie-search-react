import { configureStore } from "@reduxjs/toolkit";
import userSlice from "states/userSlice";

export default configureStore({
  reducer: {
    user: userSlice,
  },
});
