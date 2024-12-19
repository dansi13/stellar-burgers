import { error } from 'console';
import ingredientsSlice, {
  getIngredients,
  TStateIngredients
} from './IngredientsSlice';

const initialState: TStateIngredients = {
  ingredients: [],
  loading: false,
  error: null
};

const testIngredient = [
  {
    _id: 'test',
    name: 'test',
    type: 'test',
    proteins: 1,
    fat: 1,
    carbohydrates: 1,
    calories: 1,
    price: 1,
    image: 'test',
    image_mobile: 'test',
    image_large: 'test',
    __v: 1
  }
];

describe('ingredientsSlice', () => {
  it('should loading be true and error be null during pending status', () => {
    const state = ingredientsSlice.reducer(
      initialState,
      getIngredients.pending('')
    );
    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });

  it('should loading be false and error be error message during rejected status', () => {
    const state = ingredientsSlice.reducer(
      initialState,
      getIngredients.rejected(new Error('Ingredients error'), '')
    );
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Ingredients error');
  });

  it('should loading be false and update ingredients during fulfilled status', () => {
    const state = ingredientsSlice.reducer(
      initialState,
      getIngredients.fulfilled(testIngredient, '')
    );
    expect(state.loading).toBe(false);
    expect(state.error).toBe(null);
    expect(state.ingredients).toEqual(testIngredient);
  });
});
