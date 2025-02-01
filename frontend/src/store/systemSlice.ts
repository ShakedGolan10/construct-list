import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ModalState {
  isModalOpen: boolean;
  modalMsg: string;
  isError: boolean;
}

export interface SystemState {
  language: 'ltr' | 'rtl';
  theme: 'autumn' | 'night'; 
  modal: ModalState;
  isLoading: boolean;
}

const initialState: SystemState = {
  language: 'rtl', 
  theme: 'autumn', 
  modal: {
    isModalOpen: false,
    modalMsg: '',
    isError: false,
  },
  isLoading: false,
};

const systemSlice = createSlice({
  name: 'system',
  initialState,
  reducers: {
    setLanguage(state, action: PayloadAction<'ltr' | 'rtl'>) {
      state.language = action.payload;
    },
    // Theme-related reducers:
    setTheme(state, action: PayloadAction<'autumn' | 'night'>) {
      state.theme = action.payload;
    },
    toggleTheme(state) {
      state.theme = state.theme === 'autumn' ? 'night' : 'autumn';
    },
    // Modal reducers:
    openModal(state, action: PayloadAction<{ modalMsg: string; isError: boolean }>) {
      state.modal.isModalOpen = true;
      state.modal.modalMsg = action.payload.modalMsg;
      state.modal.isError = action.payload.isError;
    },
    closeModal(state) {
      state.modal.isModalOpen = false;
      state.modal.modalMsg = '';
      state.modal.isError = false;
    },
    // Loading reducer:
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
});

export const { setLanguage, setTheme, toggleTheme, openModal, closeModal, setLoading } = systemSlice.actions;
export default systemSlice.reducer;
