/// <reference types="cypress"/>

describe('Cadastro', () => {
    
    beforeEach(() => {
        cy.visit('register')
    });
    
    it('Cadastro de usuário com credenciais validas', () => {        

        cy.intercept({
            method: 'POST',
            pathname:'/api/users'

        },{
            statusCode: 200,
            fixture: 'cadastro-sucesso'
            //body: {"user":{"email":"priscila.pereira@br.experian.com","username":"priscila","bio":null}}

        }).as('postUsers')

        

        cy.get('[ng-model$=username]').type('priscila')
        cy.get('[ng-model$=password]').type('Apol@123')
        cy.get('[ng-model$=email]').type('priscila.pereira@br.experian.com')
        
        cy.contains('button', 'Sign up').click()

    });


    it.only('Cadastro de usuario com e-mail já cadastrado', () => {     
            cy.intercept({
                method: 'POST',
                pathname:'/api/users'
    
            },{
                statusCode: 422,
                fixture: 'cadastro-email-usado.json'
    
            }).as('postUsers')
    
            
    
            cy.get('[ng-model$=username]').type('Test Cypress')
            cy.get('[ng-model$=password]').type('test')
            cy.get('[ng-model$=email]').type('test_cypress@mail.com')
            
            cy.contains('button', 'Sign up').click()

            cy.get('li[ng-repeat$=errors]').should('be.visible')
        .and('contain.text', 'email has already been taken')
        
    });
});