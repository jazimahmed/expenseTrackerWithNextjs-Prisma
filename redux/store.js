// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import expensesReducer from "./slices/expenseSlice";

export const store = configureStore({
  reducer: {
    expenses: expensesReducer,
  },
});
