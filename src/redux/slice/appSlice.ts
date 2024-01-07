import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const appSlice = createSlice({
    name: 'app',
    initialState: {
        modalVisible: false
    },
    reducers: {
        toggleModal: (state, action: PayloadAction<boolean>) => {
            state.modalVisible = action.payload;
        }
    },
});

export const {toggleModal} = appSlice.actions;

export default appSlice.reducer;