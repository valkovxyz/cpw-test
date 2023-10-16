import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NavigationState {
  isNavOpen: boolean;
  isSideBarOpen: boolean;
}

const initialState: NavigationState = {
  isNavOpen: false,
  isSideBarOpen: false,
};
const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    setNavOpen: (state, action: PayloadAction<boolean>) => {
      state.isNavOpen = action.payload;
    },
    setSideBarOpen: (state, action: PayloadAction<boolean>) => {
      state.isSideBarOpen = action.payload;
    },
  },
});
export const { setNavOpen, setSideBarOpen } = navigationSlice.actions;
export default navigationSlice.reducer;
