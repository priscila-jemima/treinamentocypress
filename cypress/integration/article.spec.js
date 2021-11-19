/// <reference types="cypress"/>

var Chance = require('chance');
var chance = new Chance();


describe('Articles', () => {
    beforeEach(() => {
        cy.visit('login')

        cy.login()

        //Request URL: https://api.realworld.io/api/users/login
        //Request Method: POST

        cy.visit('/')
        
    });
    it('Criar um novo artigo', () => {
        //RouteMatcher
        //RouteHandler

        cy.intercept({
            url: 'https://api.realworld.io/api/articles',
            method: 'POST'

        }).as('postArticles')

        cy.get('[href*=editor]').click()

        const articleTitle = 'Article Example' + new Date().getTime()
       
        cy.get('input[ng-model$=title]').type(articleTitle)
        cy.get('input[ng-model$=description]').type(chance.sentence({words: 7}))
        cy.get('textarea[ng-model$=body]').type(chance.paragraph({sentence: 1}))
        cy.get('input[ng-model$=tagField]').type('cypress')

        cy.contains('button', 'Publish').click()

        cy.wait('@postArticles').then(interception => {
            cy.log(interception.response.statusCode)
            const slug = interception.response.body.article.slug

            cy.url().should('contain', slug)

            //cy.log(slug)
        })

        //interception Request/response
        cy.get('h1').should('contain', articleTitle)
        
    });

});