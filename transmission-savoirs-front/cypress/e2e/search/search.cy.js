describe('Search Component', () => {
    beforeEach(() => {
      cy.visit('localhost:8080/recherche');
    });
  
    // Test loading of the page and basic elements
    it('should display all basic elements', () => {
      cy.get('legend.search__title').should('contain', 'Recherche rapide');
      cy.get('label[for="select__learn-or-share"]').should('have.text', 'Souhaitez-vous apprendre ou partager ?');
      cy.get('label[for="select__category"]').should('have.text', 'Quelle catégorie vous intéresse ?');
      cy.get('button[type="submit"]').should('contain', 'Rechercher');
    });
  
    // Test loading of categories
    it('should load and display categories in the category select dropdown', () => {
      cy.get('select[name="category"]').should('exist').and('not.be.disabled');
  
      // Wait for categories to load and check if they are displayed
      cy.get('select[name="category"] option').should('have.length.greaterThan', 1);
    });
  
    // Test selecting learn or share option
    it('should allow selecting a learn or share option', () => {
      cy.get('select[name="learnOrShare"]').select('Partager').should('have.value', '1');
      cy.get('select[name="learnOrShare"]').select('Apprendre').should('have.value', '2');
    });
  
    // Test selecting a category
    it('should allow selecting a category from the dropdown', () => {
      // Assumes categories are loaded and the dropdown is populated
      cy.get('select[name="category"]').select('1').should('have.value', '1'); 
    });
  
    // Test form submission with missing data
    it('should not navigate to the search results page if learn or share is not selected', () => {
      cy.get('select[name="category"]').select('1'); 
      cy.get('button[type="submit"]').click();
  
      // Ensure URL has not changed and user stays on the same page
      cy.url().should('include', '/recherche');
    });
  
    it('should not navigate to the search results page if category is not selected', () => {
      cy.get('select[name="learnOrShare"]').select('Apprendre');
      cy.get('button[type="submit"]').click();
  
      // Ensure URL has not changed and user stays on the same page
      cy.url().should('include', '/recherche');
    });

        // Test form submission with valid data
        it('should navigate to the search results page on valid form submission', () => {
          cy.get('select[name="learnOrShare"]').select('Apprendre');
          cy.get('select[name="category"]').select('1'); 
          cy.get('button[type="submit"]').click();
      
          // Check if the URL has the correct parameters and is redirected to the search results page
          cy.url().should('include', '/recherche?learnOrShare=2&category=1');
        });
  
  });
  