import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ModalState {
  isModalOpen: boolean;
  successMsg: string;
  errorMsg: string;
}

export interface SystemState {
  language: 'ltr' | 'rtl';
  theme: 'autumn' | 'night';
  modal: ModalState;
  isLoading: boolean;
}

const initialState: SystemState = {
  language: 'rtl',
  theme: 'night',
  modal: {
    isModalOpen: false,
    successMsg: '',
    errorMsg: '',
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
    setTheme(state, action: PayloadAction<'autumn' | 'night'>) {
      state.theme = action.payload;
    },
    toggleTheme(state) {
      state.theme = state.theme === 'autumn' ? 'night' : 'autumn';
    },
    openModal(state, action: PayloadAction<{ successMsg?: string; errorMsg?: string }>) {
      state.modal.isModalOpen = true;
      state.modal.successMsg = action.payload.successMsg || '';
      state.modal.errorMsg = action.payload.errorMsg || '';
    },
    closeModal(state) {
      state.modal.isModalOpen = false;
      state.modal.successMsg = '';
      state.modal.errorMsg = '';
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
});

export const { setLanguage, setTheme, toggleTheme, openModal, closeModal, setLoading } =
  systemSlice.actions;
export default systemSlice.reducer;
