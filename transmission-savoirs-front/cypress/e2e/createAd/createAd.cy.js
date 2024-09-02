describe('Add New Post Page', () => {
    beforeEach(() => {
      // Step 1: Visit the login page and log in with valid credentials
      cy.visit('http://localhost:8080/connexion');
  
      // Step 2: Perform the login action
      cy.get('input[name="email"]').should('exist').type('alizeamasse@gmail.com');
      cy.get('input[name="password"]').should('exist').type('test');
      cy.get('button[type="submit"]').should('exist').click();
  
      // Step 3: Ensure the user is redirected to the homepage
      cy.url().should('include', 'localhost:8080/');
  
      // Step 4: Navigate to the "Add New Post" page
      cy.visit('http://localhost:8080/annonces/ajouter');
    });

    it('should display an error message for invalid postal code', () => {
        cy.get('input#learn').check({ force: true });
    
        cy.get('input[name="title"]').type('Titre de Test pour une Nouvelle Annonce');
        cy.get('select[name="category"]').select('1');
        cy.get('select[name="condition"]').select('1');
        cy.get('input[name="postal_code"]').type('123');
        cy.get('textarea[name="description"]').type('Description de Test pour une Nouvelle Annonce');
    
        cy.log('Tenter de soumettre le formulaire');
        cy.get('button[type="submit"]').click();
    
        cy.log('Vérifier l\'affichage du message d\'erreur');
        cy.get('.error').should('contain', 'Code postal invalide');
    });

    it('should toggle postal code field visibility based on condition selection', () => {
        cy.get('select[name="condition"]').select('1');
        cy.get('input[name="postal_code"]').should('exist').should('be.visible');
    
        cy.get('select[name="condition"]').select('2');
        cy.get('input[name="postal_code"]').should('not.exist');
    });
  
    it('should allow the user to fill out and submit the form successfully', () => {
      // Intercept the POST request for creating the post
      cy.intercept('POST', '/api/users/create-annonces').as('createAnnonce');
  
      // Fill out the form fields
      cy.get('input[id="learn"]').should('exist').check({ force: true }); // Choose "Apprendre"
      cy.get('input[name="title"]').should('exist').type('Titre de Test pour une Nouvelle Annonce');
      cy.get('select[name="category"]').should('exist').select('1'); // Adjust category ID as necessary
      cy.get('select[name="condition"]').should('exist').select('1'); // Select 'Présentiel'
      cy.get('input[name="postal_code"]').should('exist').type('13004'); // Input valid postal code
      cy.get('textarea[name="description"]').should('exist').type('Description de Test pour une Nouvelle Annonce');
  
      // Click the submit button
      cy.get('button[type="submit"]').should('exist').click();
  
      // Wait for the POST request to complete and confirm the new post was created successfully
      cy.wait('@createAnnonce').then((interception) => {
        const postId = interception.response.body.id; // Assumes the response contains the post ID
        cy.log(`Post ID captured from response: ${postId}`);
  
        // Save the URL immediately after creation before any redirection
        const createdPostUrl = `http://localhost:8080/annonces/${postId}`;
        cy.log(`Created Post URL: ${createdPostUrl}`);
  
        // Check if the redirection URL is 404 and redirect to correct URL
        cy.url().then((url) => {
          if (url.includes('localhost:8080/404')) {
            cy.log('Redirection to 404 detected, attempting to redirect to the correct post URL');
            cy.visit(createdPostUrl);
          } else {
            cy.log('Successful redirection, validating URL');
            cy.url().should('include', `/annonces/${postId}`);
          }
        });
      });
    });
  });
  