// Test loading of the page and basic elements

describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('localhost:8080/connexion');
  });

  it('should display all basic elements', () => {
    cy.get('h1.section__title').should('contain', 'Connexion');
    cy.get('label[for="email"]').should('contain', 'Adresse email');
    cy.get('label[for="password"]').should('contain', 'Mot de passe');
    cy.get('.button--plain').should('contain', 'Je me connecte');
    cy.get('.reset-password').should('contain', "J'ai oublié mon mot de passe");
  });

  // Test email validation

  it('should display an error when the email is invalid', () => {
    cy.get('input[name="email"]').type('emaili@nvalid');
    cy.get('input[name="password"]').type('validPassword123!');
    cy.get('button[type="submit"]').click();
    cy.get('.error').should('exist');
  });

  // Test password visibility toggle

  it('should show and hide the password when the corresponding button is clicked', () => {
    cy.get('input[name="password"]').should('have.attr', 'type', 'password');
    cy.get('.password__helper').click();
    cy.get('input[name="password"]').should('have.attr', 'type', 'text');
    cy.get('.password__helper').click();
    cy.get('input[name="password"]').should('have.attr', 'type', 'password');
  });

  
  // Test password reset link
  
  it('should redirect to the password reset page', () => {
    cy.get('.reset-password').click();
    cy.url().should('include', '/oubli-mot-de-passe');
  });

  // Test loading indicator

  it('should display a loading indicator when the form is submitted', () => {
    cy.get('input[name="email"]').type('alizeamasse@gmail.com');
    cy.get('input[name="password"]').type('test');
    cy.get('button[type="submit"]').click();
    cy.get('p').should('contain', 'Chargement en cours...');
  });
  
  // Test signup button
  
  it('should redirect to the registration page when the button is clicked', () => {
    cy.get('#inscription a').click();
    cy.url().should('include', '/inscription');
  });
  // Test login with valid information
  
  it('should redirect to the home page after a successful login', () => {
    cy.get('input[name="email"]').type('alizeamasse@gmail.com');
    cy.get('input[name="password"]').type('test');
    cy.get('button[type="submit"]').click();
  
    cy.url().should('eq', 'http://localhost:8080/');
  });
});
