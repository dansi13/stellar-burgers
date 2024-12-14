import { RootState } from './store';

export const selectOrderById = (number: number) => (state: RootState) => {
  if (state.feeddata.orders.length || state.ordershistory.orders.length) {
    const orderInFeed = state.feeddata.orders.find(
      (order: { number: number }) => order.number === number
    );
    if (orderInFeed) {
      return orderInFeed;
    }

    const orderInHistory = state.ordershistory.orders.find(
      (order: { number: number }) => order.number === number
    );
    if (orderInHistory) {
      return orderInHistory;
    }
  }

  if (
    state.feeddata.modalOrder &&
    state.feeddata.modalOrder.number === number
  ) {
    return state.feeddata.modalOrder;
  }

  return null;
};
