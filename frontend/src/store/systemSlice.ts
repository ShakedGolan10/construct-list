import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ModalState {
  isModalOpen: boolean;
  modalMsg: string;
  isError: boolean;
}

export interface SystemState {
  language: 'ltr' | 'rtl';
  modal: ModalState;
  isLoading: boolean;
}

const initialState: SystemState = {
  language: 'rtl', 
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
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
});

export const { setLanguage, openModal, closeModal, setLoading } = systemSlice.actions;
export default systemSlice.reducer;
