describe('Forgotten Password Page', () => {
    beforeEach(() => {
      // Visit the forgotten password page before each test
      cy.visit('http://localhost:8080/oubli-mot-de-passe');
    });
  
    it('should display the forgotten password form correctly', () => {
      // Check that the form elements are displayed correctly
      cy.get('h1.section__title').should('contain', 'Mot de passe oublié');
      cy.get('label[for="email"]').should('exist').and('have.text', 'Adresse email *');
      cy.get('input[name="email"]').should('exist').and('have.attr', 'placeholder', 'Votre adresse email...');
      cy.get('button[type="submit"]').should('exist').and('contain', 'Réinitialiser mon mot de passe');
    });
  
    it('should submit the form successfully with a valid email', () => {
      // Intercept the API call for password reset
      cy.intercept('POST', '/api/resetpassword').as('resetPassword');
  
      // Fill out the form and submit it
      cy.get('input[name="email"]').type('alizeamasse@gmail.com');
      cy.get('button[type="submit"]').click();
  
      // Wait for the API call to complete and check the response
      cy.wait('@resetPassword').its('response.statusCode').should('eq', 200);
  
      // Check for the confirmation message
      cy.get('p').should('contain', 'Un email contenant les instructions pour réinitialiser votre mot de passe vous a été envoyé.');
    });
  
    it('should display an error message for an invalid email', () => {
      // Intercept the API call for password reset and force a failure response
      cy.intercept('POST', '/api/resetpassword', {
        statusCode: 404,
        body: { message: 'Nous n\'avons trouvé aucun·e utilisateur·ice avec cet email.' },
      }).as('resetPassword');
  
      // Fill out the form with an invalid email and submit it
      cy.get('input[name="email"]').type('inval@idemail');
      cy.get('button[type="submit"]').click();
  
      // Wait for the API call to complete
      cy.wait('@resetPassword');
  
      // Check that an error message is displayed
      cy.get('.error').should('contain', 'Nous n\'avons trouvé aucun·e utilisateur·ice avec cet email.');
    });
  
    it('should show a loading message when the form is submitted', () => {
      // Intercept the API call for password reset to delay the response
      cy.intercept('POST', '/api/resetpassword', (req) => {
        req.reply((res) => {
          res.send({
            delay: 1000,
            statusCode: 200,
            body: { message: 'Un email contenant les instructions pour réinitialiser votre mot de passe vous a été envoyé.' },
          });
        });
      }).as('resetPassword');
  
      // Fill out the form and submit it
      cy.get('input[name="email"]').type('alizeamasse@gmail.com');
      cy.get('button[type="submit"]').click();
  
      // Check for the loading message
      cy.get('p').should('contain', 'Chargement en cours...');
  
      // Wait for the API call to complete
      cy.wait('@resetPassword');
    });
  
  });
  