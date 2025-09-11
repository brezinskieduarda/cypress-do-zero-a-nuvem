Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
  cy.get('#firstName').type('Maria')
  cy.get('#lastName').type('Cezarina')
  cy.get('#email').type('mail@mail.com')
  cy.get('#open-text-area').type('Testo grande para teste, objecto de teste')
  cy.get('button[type="submit"]').click()
})
