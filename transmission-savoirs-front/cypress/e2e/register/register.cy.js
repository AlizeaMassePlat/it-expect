describe('Signup Page', () => {
    beforeEach(() => {
      cy.visit('localhost:8080/inscription'); 
    });
  
    // Test loading of the page and basic elements
    it('should display all basic elements', () => {
      cy.get('h1.section__title').should('contain', 'Inscription');
      cy.get('label[for="email"]').should('contain', 'Adresse email');
      cy.get('label[for="password"]').should('contain', 'Mot de passe');
      cy.get('label[for="password-confirm"]').should('contain', 'Confirmation du mot de passe');
      cy.get('label[for="username"]').should('contain', "Nom d'utilisateur ou d'utilisatrice");
      cy.get('label[for="birthdate"]').should('contain', 'Date de naissance');
      cy.get('.button--plain').should('contain', "Je m'inscris");
    });
  
    // Test email validation
    it('should display an error when the email is invalid', () => {
      cy.get('input[name="email"]').type('invalid@email');
      cy.get('input[name="password"]').type('validPassword123!');
      cy.get('input[name="passwordConfirm"]').type('validPassword123!');
      cy.get('input[name="username"]').type('testuser');
      cy.get('input[name="birthdate"]').type('2000-01-01');
      cy.get('button[type="submit"]').click();
      cy.get('.error').should('contain', 'Email non valide');
    });
  
    // Test password matching
    it('should display an error when passwords do not match', () => {
      cy.get('input[name="email"]').type('test@example.com');
      cy.get('input[name="password"]').type('validPassword123!');
      cy.get('input[name="passwordConfirm"]').type('differentPassword!');
      cy.get('input[name="username"]').type('testuser');
      cy.get('input[name="birthdate"]').type('2000-01-01');
      cy.get('button[type="submit"]').click();
      cy.get('.error').should('contain', 'Les mots de passe ne sont pas identiques');
    });
  
    // Test password visibility toggle
    it('should toggle the visibility of the passwords', () => {
      cy.get('input[name="password"]').should('have.attr', 'type', 'password');
      cy.get('input[name="passwordConfirm"]').should('have.attr', 'type', 'password');
      cy.get('.password__toggle').click();
      cy.get('input[name="password"]').should('have.attr', 'type', 'text');
      cy.get('input[name="passwordConfirm"]').should('have.attr', 'type', 'text');
      cy.get('.password__toggle').click();
      cy.get('input[name="password"]').should('have.attr', 'type', 'password');
      cy.get('input[name="passwordConfirm"]').should('have.attr', 'type', 'password');
    });

        // Test loading indicator

        it('should display a loading indicator when the form is submitted', () => {
            cy.get('input[name="email"]').type('validEmailExemple@example.com');
            cy.get('input[name="password"]').type('validPassword123!Exemple');
            cy.get('input[name="passwordConfirm"]').type('validPassword123!Exemple');
            cy.get('input[name="username"]').type('testuser');
            cy.get('input[name="birthdate"]').type('2000-01-01');
            cy.get('button[type="submit"]').click();
            cy.get('p').should('contain', 'Chargement en cours...');
          });
  
    // Test signup with valid information
    it('should redirect to the homepage after a successful signup', () => {
      cy.get('input[name="email"]').type('validEmailExemple@example.com');
      cy.get('input[name="password"]').type('validPassword123!Exemple');
      cy.get('input[name="passwordConfirm"]').type('validPassword123!Exemple');
      cy.get('input[name="username"]').type('testuser');
      cy.get('input[name="birthdate"]').type('2000-01-01');
      cy.get('button[type="submit"]').click();
  
      cy.url().should('eq', 'http://localhost:8080/');
    });
  
  });
  