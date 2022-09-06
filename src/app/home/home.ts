import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";

export interface HomeState {
    user?: any,
    refAddress?: string,
    refAddress1?: string | null
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
        },
        setRefAddress1: (state, action: PayloadAction<HomeState>) => {
            state.refAddress1 = action.payload.refAddress1;
        }
    }
});

export const {
    logout,
    setUser,
    setRefAddress,
    setRefAddress1
} = homeSlice.actions;

export default homeSlice.reducer;