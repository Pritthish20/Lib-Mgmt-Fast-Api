import { configureStore } from '@reduxjs/toolkit'
import authSlice  from './Slice/authSlice'
import bookSlice from './Slice/bookSlice'


export const store = configureStore({
  reducer: {
    auth:authSlice,
    book:bookSlice,
  },
  
})
