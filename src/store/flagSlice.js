import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: {
        startPointFlag: false,
        endPointFlag: false,
        betweenPoint: false,
        wallFlag: false,
        weightFlag: false,
        isActiveBetweenPoint: false,
        algName: ''
    }
}

export const flagSlice = createSlice({
    name: 'flag',
    initialState,

    reducers: {
        setToTrueFlag: (state, action) => {
            state.value[action.payload] = true
        },
        setToFalseFlag: (state, action) => {
            state.value[action.payload] = false
        },
        toggleFlag: (state, action) => {
            state.value[action.payload] = !state.value[action.payload]
        },
        setAlgName: (state, action) => {
            state.value.algName = action.payload
        }
    }
})

export const { setToTrueFlag, setToFalseFlag, toggleFlag, setAlgName } = flagSlice.actions

export default flagSlice.reducer