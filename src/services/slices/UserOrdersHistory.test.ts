import {
  TStateOrdersHistory,
  ordersHistory,
  userOrdersHistorySlice
} from './UserOrdersHistory';

const initialState: TStateOrdersHistory = {
  orders: [],
  loading: false,
  error: null
};

const testOrders = {
  success: true,
  orders: [
    {
      _id: 'test',
      ingredients: ['test'],
      status: 'test',
      name: 'test',
      createdAt: 'test',
      updatedAt: 'test',
      number: 1
    }
  ],
  total: 1,
  totalToday: 1
};

describe('userOrdersHistorySlice', () => {
  it('should set loading to true and error to null during pending status', () => {
    const state = userOrdersHistorySlice.reducer(
      initialState,
      ordersHistory.pending('')
    );
    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });

  it('should set loading to false and error to error message during rejected status', () => {
    const state = userOrdersHistorySlice.reducer(
      initialState,
      ordersHistory.rejected(new Error('Orders error'), '')
    );
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Orders error');
  });

  it('should set loading to false and update orders during fulfilled status', () => {
    const state = userOrdersHistorySlice.reducer(
      initialState,
      ordersHistory.fulfilled(testOrders.orders, '')
    );
    expect(state.loading).toBe(false);
    expect(state.error).toBe(null);
    expect(state.orders).toEqual(testOrders.orders);
  });
});
