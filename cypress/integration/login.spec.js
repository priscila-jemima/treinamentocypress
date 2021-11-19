/// <reference types="cypress" />

describe.only('Login', () => {
    it('Autenticar com credenciais válidas', () => {
        cy.visit("http://demo.realworld.io/#/login")

        cy.get("input[type=email]").type(Cypress.env('user'))
        cy.get("input[type=password]").type(Cypress.env('pass'))
        cy.contains('button', 'Sign in').click()

        cy.get('[href*=editor]').should('be.visible')

    });


    it.only('Autenticar com senha incorreta)', () => {
        cy.visit("http://demo.realworld.io/#/login")

        cy.get("input[type=email]").type('priscila.pereira@br.experian.com')
        cy.get("input[type=password]").type('wrong')
        cy.contains('button', 'Sign in').click()

        cy.get('li[ng-repeat$=errors]').should('be.visible')
        .and('contain.text', 'email or password is invalid')
    
       
    });


    it.only('Autenticar com formato de email incorreto)', () => {
        cy.visit("http://demo.realworld.io/#/login")

        cy.get("input[type=email]").type('priscilatest@comtest.br')
        cy.get("input[type=password]").type('wrong')
        cy.contains('button', 'Sign in').click()

        cy.get('li[ng-repeat$=errors]').should('be.visible')
        .and('contain.text', 'email or password is invalid')
    });

});


