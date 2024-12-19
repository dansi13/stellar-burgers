import { expect, test } from '@jest/globals';
import { rootReducer } from './store';
import { burgerConstructorSlice } from './slices/BurgerConstructorSlice';
import ingredientsSlice from './slices/IngredientsSlice';
import { userStateSlice } from './slices/UserinfoSlice';
import { feedDataSlice } from './slices/FeedDataSlice';
import { userOrdersHistorySlice } from './slices/UserOrdersHistory';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    [burgerConstructorSlice.name]: burgerConstructorSlice.reducer,
    [feedDataSlice.name]: feedDataSlice.reducer,
    [ingredientsSlice.name]: ingredientsSlice.reducer,
    [userStateSlice.name]: userStateSlice.reducer,
    [userOrdersHistorySlice.name]: userOrdersHistorySlice.reducer
  }
});

test('test', () => {
  expect(store).toBeDefined();
});
