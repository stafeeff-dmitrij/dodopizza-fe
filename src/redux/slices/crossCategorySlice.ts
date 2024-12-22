import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store.ts';


interface State {
	activeId: number;
}

const initialState: State = {
	activeId: 1
};

export const crossCategorySlice = createSlice({
	name: 'crossCategory',
	initialState,
	reducers: {
		setActiveId: (state, action: PayloadAction<number>) => {
			state.activeId = action.payload;
		},
	},
});


export const selectActiveId = (state: RootState) => state.crossCategory;

export const { setActiveId } = crossCategorySlice.actions;
export default crossCategorySlice.reducer;