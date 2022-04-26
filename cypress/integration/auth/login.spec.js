import testUser from '../../fixtures/testUser'
import { faker } from '@faker-js/faker';

describe('Login test', () => {
  Cypress.Cookies.debug(true)
  beforeEach(() => {
    cy.visit(`${Cypress.env('host')}/login`);
  });

  it('should login with valid credentials and logout', () => {
    cy.get('input#email').type(testUser.email);
    cy.get('input#password').type(testUser.password);
    cy.get('[data-cy=form-login]').submit();
    cy.get('h1').should('contain', 'Successfully logged in');

    cy.wait(1000);
    cy.visit(Cypress.env('host'));

    cy.visit(`${Cypress.env('host')}/login`);
    cy.get('[data-cy=form-login]').should('not.exist');
    cy.wait(1000);
    cy.visit(`${Cypress.env('host')}/api/auth/logout`);
    cy.visit(`${Cypress.env('host')}/login`);
    cy.wait(1000);
    cy.get('[data-cy=form-login]').should('exist');
  });

  it('should not login with invalid credentials', () => {
    cy.get('input#email').type(faker.internet.email('Jeanne', 'Doe', 'test.com'));
    cy.get('input#password').type(faker.internet.password(20));
    cy.get('[data-cy=form-login]').submit();
    cy.get('[data-cy=form-error]').should('contain', 'Error: Incorrect email or password');
  });

  it('should not have access to the main page if is not logged in', () => {
    cy.visit(Cypress.env('host'));
    cy.get('[data-cy=form-login]').should('exist');
  })
})
