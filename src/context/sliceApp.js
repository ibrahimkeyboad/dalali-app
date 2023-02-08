import { createSlice } from '@reduxjs/toolkit';

const slices = createSlice({
  name: 'counter',
  initialState: {
    toggle: false,
    minPrice: 0,
    maxPrice: 100,
    code: '',
  },
  reducers: {
    toggleHandler(state) {
      state.toggle = !state.toggle;
    },
    handleMinPrice(state, action) {
      state.minPrice = action.payload;
    },
    handleMaxPrice(state, action) {
      state.maxPrice = action.payload;
    },
    setCodeHandler(state, action) {
      state.code = action.payload;
    },
  },
});

export const { toggleHandler, setCodeHandler } = slices.actions;

export default slices.reducer;
