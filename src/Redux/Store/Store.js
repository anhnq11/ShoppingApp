import { configureStore } from '@reduxjs/toolkit'
import Reducer from '../Reducer/Reducer'

export const store = configureStore({
    reducer: {
        auth: Reducer,
    }
})