import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store.ts';
import { Category } from '../api/categoryApi.ts';


interface State {
	activeId: number;
	categories: Category[];
}

const initialState: State = {
	activeId: 1,
	categories: []
};

export const categorySlice = createSlice({
	name: 'category',
	initialState,
	reducers: {
		setActiveId: (state, action: PayloadAction<number>) => {
			state.activeId = action.payload;
		},
		setCategories: (state, action: PayloadAction<Category[]>) => {
			state.categories = action.payload;
		},
	},
});


export const selectCategory = (state: RootState) => state.category;

export const { setActiveId, setCategories } = categorySlice.actions;
export default categorySlice.reducer;