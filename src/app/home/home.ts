import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";

export interface HomeState {
    user?: any,
    refAddress?: string
}

const initialState: HomeState = {
    user: null,
    refAddress: ""
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
            window.localStorage.removeItem("jwtToken");
        },
        setRefAddress: (state, action: PayloadAction<HomeState>) => {
            state.refAddress = action.payload.refAddress;
        }
    }
});

export const {
    logout,
    setUser,
    setRefAddress
} = homeSlice.actions;

export default homeSlice.reducer;