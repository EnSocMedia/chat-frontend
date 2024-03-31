import { createReducer } from "@reduxjs/toolkit";
import { getPastMessagesUsingLastTimestamp } from "./actions";
import { truncate } from "fs";

export interface PastMessageFetchState {
  isFetchingPastMessages: boolean;
  isFecthingPastMessageStatus: boolean;
}

export const initialState: PastMessageFetchState = {
  isFecthingPastMessageStatus: false,
  isFetchingPastMessages: true,
};
export const messageLoadingSlice = createReducer<PastMessageFetchState>(
  initialState,
  (builder) =>
    builder.addCase(getPastMessagesUsingLastTimestamp.pending, (state, action) => {
        state.isFecthingPastMessageStatus = true;
        state.isFetchingPastMessages = true
    }).addCase(getPastMessagesUsingLastTimestamp.fulfilled, (state, action) => {
        state.isFecthingPastMessageStatus = false;
        state.isFetchingPastMessages = false
    })
);
