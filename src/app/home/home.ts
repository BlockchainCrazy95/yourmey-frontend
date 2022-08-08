import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";

export interface HomeState {
    user?: any
}

const initialState: HomeState = {};

export const homeSlice = createSlice({
    name: "home",
    initialState,
    reducers: {
        setUser: ( state, action: PayloadAction<HomeState>) => {

        }
    }
});

export const {
    setUser
} = homeSlice.actions;

export default homeSlice.reducer;