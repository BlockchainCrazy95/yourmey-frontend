import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";

export interface AuctionState {
    auctionList?: any
}

const initialState: AuctionState = {
    auctionList: []
}

export const auctionSlice = createSlice({
    name: "auction",
    initialState,
    reducers: {
        setAuctionList: (state, action: PayloadAction<AuctionState>) => {
            state.auctionList = action.payload.auctionList;
        }
    }
});

export const {
    setAuctionList
} = auctionSlice.actions;

export default auctionSlice.reducer