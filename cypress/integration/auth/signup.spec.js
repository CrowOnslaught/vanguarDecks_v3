import testUser from '../../fixtures/testUser'
import { faker } from '@faker-js/faker';

describe('Signup test', () => {
  Cypress.Cookies.debug(true)
  beforeEach(() => {
    cy.visit(`${Cypress.env('host')}/signup`);
  });

  it('should register with valid credentials', () => {
    cy.get('input#name').type(testUser.name);
    cy.get('input#email').type(testUser.email);
    cy.get('input#password').type(testUser.password);
    cy.get('[data-cy=form-signup]').submit();
    cy.get('h1').should('contain', 'Successfully registered');

    cy.wait(1000);
    cy.visit(Cypress.env('host'));
    cy.clearCookies();
  });

  it('should not register without set a name', () => {
    cy.visit(`${Cypress.env('host')}/signup`);
    cy.wait(1000);
    cy.get('input#email').type(faker.internet.email('Jeanne', 'Doe', 'test.com'));
    cy.get('input#password').type(faker.internet.password(20));
    cy.get('[data-cy=form-signup]').submit();
    cy.get('[data-cy=form-error]').should('contain', 'Error: "name" is not allowed to be empty');
  });

  it('should not register without set a email', () => {
    cy.reload();
    cy.get('input#name').type(faker.internet.userName());
    cy.get('input#password').type(faker.internet.password(20));
    cy.get('[data-cy=form-signup]').submit();
    cy.get('[data-cy=form-error]').should('contain', 'Error: "email" is not allowed to be empty');
  });

  it('should not register without set a password', () => {
    cy.reload();
    cy.get('input#name').type(faker.internet.userName());
    cy.get('input#email').type(faker.internet.email('Jeanne', 'Doe', 'test.com'));
    cy.get('[data-cy=form-signup]').submit();
    cy.get('[data-cy=form-error]').should('contain', 'Error: "password" is not allowed to be empty');
  });

  it('should set a secure password', () => {
    cy.reload();
    cy.get('input#name').type(faker.internet.userName());
    cy.get('input#email').type(faker.internet.email('Jeanne', 'Doe', 'test.com'));
    cy.get('input#password').type(faker.internet.password(6));
    cy.get('[data-cy=form-signup]').submit();
    cy.get('[data-cy=form-error]').should('contain', 'Error: password must be at least 8 characters');

    cy.reload();
    cy.get('input#name').type(faker.internet.userName());
    cy.get('input#email').type(faker.internet.email('Jeanne', 'Doe', 'test.com'));
    cy.get('input#password').type(faker.internet.password(10, true, /[0-9]/));
    cy.get('[data-cy=form-signup]').submit()
    cy.get('[data-cy=form-error]').should('contain', 'Error: password must contain at least 1 letter and 1 number');

    cy.reload();
    cy.get('input#name').type(faker.internet.userName());
    cy.get('input#email').type(faker.internet.email('Jeanne', 'Doe', 'test.com'));
    cy.get('input#password').type(faker.internet.password(10, true, /[A-Z]/));
    cy.get('[data-cy=form-signup]').submit();
    cy.get('[data-cy=form-error]').should('contain', 'Error: password must contain at least 1 letter and 1 number');
  });
})
