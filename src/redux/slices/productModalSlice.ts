import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../store.ts';
import { Product } from '../api/productApi.ts';


interface State {
	activeProduct: Product | null;
	openModal: boolean;
}

const initialState: State = {
	activeProduct: null,
	openModal: false,
};

/**
 * Слайс для управления состоянием модального окна с товаром
 */
export const productModuleSlice = createSlice({
	name: 'productModal',
	initialState,
	reducers: {
		// включение модального окна
		setActiveModal: (state, action: PayloadAction<Product>) => {
			state.activeProduct = action.payload;
			state.openModal = true;
		},
		// отключение модального окна
		setDeActiveModal: (state) => {
			state.activeProduct = null;
			state.openModal = false;
		},
	},
});


export const selectActiveProduct = (state: RootState) => state.productModal;

export const { setActiveModal, setDeActiveModal } = productModuleSlice.actions;
export default productModuleSlice.reducer;