import { createSlice } from "@reduxjs/toolkit";

export const updateUser = createSlice({
  name: "user",
  initialState: {
    uid: "",
    name: "",
    username: ""
  },
  reducers: {
    update: (state, action) => {
      state.uid = action.payload.uid;
      state.name = action.payload.name;
      state.username = action.payload.username;
    }
  }
});

export const { update } = updateUser.actions;
export default updateUser.reducer;