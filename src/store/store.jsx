import { configureStore } from '@reduxjs/toolkit'
import  authSlice  from './authReducer'

export default configureStore({
  reducer: {
    auth:authSlice,
  },
})