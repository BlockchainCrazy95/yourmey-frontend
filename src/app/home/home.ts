import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";

export interface HomeState {
    user?: any
}

const initialState: HomeState = {
    user: null
};

export const homeSlice = createSlice({
    name: "home",
    initialState,
    reducers: {
        setUser: ( state, action: PayloadAction<HomeState>) => {
            state.user = {...action.payload};
        },
        logout: (state) => {
            state.user = null;
        }
    }
});

export const {
    logout,
    setUser
} = homeSlice.actions;

export default homeSlice.reducer;