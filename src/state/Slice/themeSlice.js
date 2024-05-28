import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "dark" ? "light" : "dark";
    },
  },
});

export const { setMode } = themeSlice.actions;

export default themeSlice.reducer;
