import {
  getFeedData,
  getOrderByNum,
  TStateFeed,
  feedDataSlice
} from './FeedDataSlice';

const initialState: TStateFeed = {
  orders: [],
  total: 0,
  totalToday: 0,
  error: null,
  loading: false,
  modalOrder: null
};

const testFeedData = {
  success: true,
  orders: [
    {
      _id: 'test',
      status: 'done',
      name: 'test',
      createdAt: 'test',
      updatedAt: 'test',
      number: 1,
      ingredients: ['test', 'test', 'test']
    },
    {
      _id: 'test',
      status: 'done',
      name: 'test',
      createdAt: 'test',
      updatedAt: 'test',
      number: 2,
      ingredients: ['test', 'test', 'test']
    }
  ],
  total: 2,
  totalToday: 2
};

describe('feedDataSlice', () => {
  it('should set loading to true and error to null during pending status', () => {
    const state = feedDataSlice.reducer(initialState, getFeedData.pending(''));
    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });

  it('should set loading to false and error to error message during rejected status', () => {
    const state = feedDataSlice.reducer(
      initialState,
      getFeedData.rejected(new Error('Feed error'), '')
    );
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Feed error');
  });

  it('should set loading to false and update feed data during fulfilled status', () => {
    const state = feedDataSlice.reducer(
      initialState,
      getFeedData.fulfilled(testFeedData, '')
    );
    expect(state.loading).toBe(false);
    expect(state.error).toBe(null);
    expect(state.orders).toEqual(testFeedData.orders);
    expect(state.total).toBe(testFeedData.total);
    expect(state.totalToday).toBe(testFeedData.totalToday);
  });

  it('should set loading to true when getting order by number', () => {
    const state = feedDataSlice.reducer(
      initialState,
      getOrderByNum.pending('1', 1)
    );
    expect(state.loading).toBe(true);
  });

  it('should set loading to false and update modal order when getting order by number is fulfilled', () => {
    const state = feedDataSlice.reducer(
      initialState,
      getOrderByNum.fulfilled(testFeedData, '1', 1)
    );
    expect(state.loading).toBe(false);
    expect(state.modalOrder).toEqual(testFeedData.orders[0]);
  });

  it('should set loading to false and error when getting order by number is rejected', () => {
    const state = feedDataSlice.reducer(
      initialState,
      getOrderByNum.rejected(new Error('Feed error'), '1', 1)
    );
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Feed error');
  });
});
