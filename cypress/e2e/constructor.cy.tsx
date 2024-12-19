describe('Burger Constructor Page', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', 'api/auth/user', { fixture: 'userData.json' });
    cy.intercept('POST', 'api/orders', { fixture: 'orderResponse.json' });
    //токены для успешной авторизации
    window.localStorage.setItem(
      'refreshToken',
      JSON.stringify('test-refreshToken')
    );

    cy.setCookie('accessToken', 'test-accessToken');

    cy.viewport(1300, 800);
    cy.visit('/');
  });

  afterEach(function () {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  // Тесты для добавления ингредиентов
  it('should add ingredients to the constructor', () => {
    cy.get('[data-cy=bun_1_constructor]')
      .contains('Краторная булка N-200i')
      .should('not.exist');
    cy.get('[data-cy=bun_2_constructor]')
      .contains('Краторная булка N-200i')
      .should('not.exist');
    cy.get('[data-cy=bun_ingredients]').contains('Добавить').click();
    cy.get('[data-cy=bun_1_constructor]')
      .contains('Краторная булка N-200i')
      .should('exist'); // Добавление булок
    cy.get('[data-cy=ingredient_constructor]')
      .contains('Филе лосось')
      .should('not.exist');
    cy.get('[data-cy=ingredient_constructor]')
      .contains('Соус традиционный галактический')
      .should('not.exist');
    cy.get('[data-cy=main_ingredients]').contains('Добавить').click();
    cy.get('[data-cy=ingredient_constructor]')
      .contains('Филе лосось')
      .should('exist'); // Добавление ингредиентов
  });

  // Тесты для модальных окон
  it('should open ingredient modal', () => {
    cy.get('[data-cy=modal]').should('not.exist');
    cy.get('[data-cy=bun_ingredients]')
      .contains('Краторная булка N-200i')
      .click();
    cy.get('[data-cy=modal]')
      .contains('Краторная булка N-200i')
      .should('exist');
  });

  it('should close modal on button click', () => {
    cy.get('[data-cy=bun_ingredients]')
      .contains('Краторная булка N-200i')
      .click();
    cy.get('[data-cy=modal]').should('exist');
    cy.get('[data-cy=close_icon]').click();
    cy.get('[data-cy=modal]').should('not.exist');
  });

  it('should close modal on overlay click', () => {
    cy.get('[data-cy=bun_ingredients]')
      .contains('Краторная булка N-200i')
      .click();
    cy.get('[data-cy=modal]').should('exist');
    cy.get('[data-cy=overlay]')
      .should('exist')
      .click('topRight', { force: true });
    cy.get('[data-cy=modal]').should('not.exist');
  });

  // Тесты для создания заказа
  it('should create an order', () => {
    cy.intercept('POST', 'api/orders', { fixture: 'orderResponse.json' }).as(
      'createOrder'
    );
    cy.intercept('GET', 'api/user', { fixture: 'userData.json' }).as(
      'getUserData'
    );

    cy.get('[data-cy=bun_ingredients]').contains('Добавить').click();
    cy.get('[data-cy=main_ingredients]').contains('Добавить').click();
    cy.get('[data-cy=souce_ingredients]').contains('Добавить').click();

    cy.get('[data-cy=order_button]')
      .contains('Оформить заказ')
      .should('exist')
      .click();

    cy.get('[data-cy=order_number]').contains('999').should('exist');

    cy.get('[data-cy=close_icon]').click();
    cy.get('[data-cy=modal]').should('not.exist');

    cy.get('[data-cy=constructor]').should(
      'not.contain',
      'Краторная булка N-200i'
    );
    cy.get('[data-cy=ingredient_constructor]').should(
      'not.contain',
      'Филе лосось'
    );
    cy.get('[data-cy=ingredient_constructor]').should(
      'not.contain',
      'Соус Spicy-X'
    );
  });
});
