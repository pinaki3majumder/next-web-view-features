import { Post } from "@/models/dummy-loans.types";
import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
    value: null | Post[];
};

const initialState: InitialState = {
    value: []
};

const loanData = createSlice({
    name: "loan-data",
    initialState,
    reducers: {
        add: (state, action) => {
            state.value = action.payload as Post[];
        },
        reset: (state) => {
            state.value = [];
        }
    }
});

export const { add, reset } = loanData.actions;
export const loanDataReducer = loanData.reducer;