declare namespace Cypress{
    interface Chainable{
        /** 
       * @example cy.login('user123', 'pass321')
        */
        login(): void
    }
}