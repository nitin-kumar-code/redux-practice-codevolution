import { createSlice } from "@reduxjs/toolkit";

const initialState={
    numOfIcecreams: 20,
}

const icecreamSlice = createSlice({
    name:'icecream',
    initialState,
    reducers:{
        ordered: (state) => {
            state.numOfIcecreams --
        },
        restocked: (state, action) => {
            state.numOfIcecreams += action.payload
        },
    },
    extraReducers: (builder) => {
    builder.addCase('cake/ordered', (state) => {
      state.numOfIcecreams--
    })
  }
})

const { ordered, restocked } = icecreamSlice.actions;
export { ordered, restocked };
export default icecreamSlice.reducer;