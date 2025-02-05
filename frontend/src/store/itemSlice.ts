import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Item {
  id: string;
  name: string;
  category: string;
  createdAt: string;
}

interface ItemsState {
  list: Item[];
}

const initialState: ItemsState = {
  list: [],
};

const itemSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Item[]>) {
      state.list = action.payload;
    },
    addItem(state, action: PayloadAction<Item>) {
      state.list.push(action.payload);
    },
    updateItem(state, action: PayloadAction<Item>) {
      const idx = state.list.findIndex((item) => item.id === action.payload.id);
      state.list[idx] = { ...action.payload };
    },
    removeItem(state, action: PayloadAction<string>) {
      state.list = state.list.filter((item) => item.id !== action.payload);
    },
  },
});

export const { setItems, addItem, removeItem } = itemSlice.actions;
export default itemSlice.reducer;
