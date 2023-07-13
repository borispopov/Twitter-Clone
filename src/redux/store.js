import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./setProfile"

export default configureStore({
  reducer: {
    updateUser: profileReducer
  }
});
