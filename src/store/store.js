import { configureStore } from "@reduxjs/toolkit";
import mainConfigReducer from '././mainConfigSlice'
import flagReducer from './flagSlice'

export const store = configureStore({
    reducer: {
        mainConfig: mainConfigReducer,
        flag: flagReducer
    },
})