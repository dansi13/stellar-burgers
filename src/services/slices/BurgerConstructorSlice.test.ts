import { nanoid } from '@reduxjs/toolkit';
import {
  addIngredient,
  removeIngredient,
  moveUpIngredient,
  moveDownIngredient
} from './BurgerConstructorSlice';

import burgerConstructorSlice from './BurgerConstructorSlice';

import { TConstructorIngredient } from '@utils-types';

describe('BurgerConstructorSlice', () => {
  const initialState = {
    constructorItems: {
      bun: null,
      ingredients: []
    },
    orderRequest: false,
    orderModalData: null,
    loading: false,
    error: null
  };

  it('should return the initial state', () => {
    expect(burgerConstructorSlice.getInitialState()).toEqual(initialState);
  });

  it('should handle addIngredient for bun', () => {
    const bun: TConstructorIngredient = {
      _id: '123',
      id: '123',
      type: 'bun',
      name: 'Bun',
      carbohydrates: 10,
      calories: 10,
      fat: 10,
      proteins: 10,
      image_mobile: 'https://example.com/bun-mobile.jpg',
      image_large: 'https://example.com/bun-large.jpg',
      image: 'https://example.com/bun.jpg',
      price: 10
    };
    const action = addIngredient(bun);
    const newState = burgerConstructorSlice.reducer(initialState, action);

    expect(newState.constructorItems.bun).toEqual({
      ...bun,
      id: expect.any(String)
    });
  });

  it('should handle addIngredient for other ingredients', () => {
    const ingredient: TConstructorIngredient = {
      _id: '123',
      id: '123',
      type: 'main',
      name: 'Kotleta',
      carbohydrates: 10,
      calories: 10,
      fat: 10,
      proteins: 10,
      image_mobile: 'https://example.com/kotleta-mobile.jpg',
      image_large: 'https://example.com/kotleta-large.jpg',
      image: 'https://example.com/kotleta.jpg',
      price: 10
    };
    const action = addIngredient(ingredient);
    const newState = burgerConstructorSlice.reducer(initialState, action);

    expect(newState.constructorItems.ingredients).toContainEqual({
      ...ingredient,
      id: expect.any(String)
    });
  });

  it('should handle removeIngredient', () => {
    const ingredient: TConstructorIngredient = {
      _id: '123',
      id: nanoid(),
      type: 'main',
      name: 'Kotleta',
      carbohydrates: 10,
      calories: 10,
      fat: 10,
      proteins: 10,
      image_mobile: 'https://example.com/kotleta-mobile.jpg',
      image_large: 'https://example.com/kotleta-large.jpg',
      image: 'https://example.com/kotleta.jpg',
      price: 10
    };
    const stateWithIngredient = {
      ...initialState,
      constructorItems: {
        ...initialState.constructorItems,
        ingredients: [ingredient]
      }
    };
    const action = removeIngredient(ingredient);
    const newState = burgerConstructorSlice.reducer(
      stateWithIngredient,
      action
    );

    expect(newState.constructorItems.ingredients).not.toContainEqual(
      ingredient
    );
  });

  it('should handle moveUpIngredient', () => {
    const ingredient1: TConstructorIngredient = {
      _id: '123',
      id: nanoid(),
      type: 'main',
      name: 'Kotleta',
      carbohydrates: 10,
      calories: 10,
      fat: 10,
      proteins: 10,
      image_mobile: 'https://example.com/kotleta-mobile.jpg',
      image_large: 'https://example.com/kotleta-large.jpg',
      image: 'https://example.com/kotleta.jpg',
      price: 10
    };
    const ingredient2: TConstructorIngredient = {
      _id: '124',
      id: nanoid(),
      type: 'main',
      name: 'Salad',
      carbohydrates: 10,
      calories: 10,
      fat: 10,
      proteins: 10,
      image_mobile: 'https://example.com/salad-mobile.jpg',
      image_large: 'https://example.com/salad-large.jpg',
      image: 'https://example.com/salad.jpg',
      price: 10
    };
    const stateWithIngredients = {
      ...initialState,
      constructorItems: {
        ...initialState.constructorItems,
        ingredients: [ingredient1, ingredient2]
      }
    };
    const action = moveUpIngredient(1);
    const newState = burgerConstructorSlice.reducer(
      stateWithIngredients,
      action
    );

    expect(newState.constructorItems.ingredients).toEqual([
      ingredient2,
      ingredient1
    ]);
  });

  it('should handle moveDownIngredient', () => {
    const ingredient1: TConstructorIngredient = {
      _id: '123',
      id: nanoid(),
      type: 'main',
      name: 'Kotleta',
      carbohydrates: 10,
      calories: 10,
      fat: 10,
      proteins: 10,
      image_mobile: 'https://example.com/kotleta-mobile.jpg',
      image_large: 'https://example.com/kotleta-large.jpg',
      image: 'https://example.com/kotleta.jpg',
      price: 10
    };
    const ingredient2: TConstructorIngredient = {
      _id: '124',
      id: nanoid(),
      type: 'main',
      name: 'Salad',
      carbohydrates: 10,
      calories: 10,
      fat: 10,
      proteins: 10,
      image_mobile: 'https://example.com/salad-mobile.jpg',
      image_large: 'https://example.com/salad-large.jpg',
      image: 'https://example.com/salad.jpg',
      price: 10
    };
    const stateWithIngredients = {
      ...initialState,
      constructorItems: {
        ...initialState.constructorItems,
        ingredients: [ingredient1, ingredient2]
      }
    };
    const action = moveDownIngredient(0);
    const newState = burgerConstructorSlice.reducer(
      stateWithIngredients,
      action
    );

    expect(newState.constructorItems.ingredients).toEqual([
      ingredient2,
      ingredient1
    ]);
  });
});
