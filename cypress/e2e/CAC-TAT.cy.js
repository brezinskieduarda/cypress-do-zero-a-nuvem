import { faker } from '@faker-js/faker'

describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html')
    const user = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      telefone: faker.number.telefone(),
      longText: faker.lorem.paragraphs(3) // gera textos mais realistas
    }
    cy.wrap(user).as('user') // alias para utilizar em todo o sistema
  })

  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })
  it('preenche os campos obrigatórios e envia do formulário', function () {
    cy.get('#firstName').type(this.user.firstName)
    cy.get('#lastName').type(this.user.lastName)
    cy.get('#email').type(this.user.email)
    cy.get('#open-text-area').type(this.user.longText, { delay: 0 })
    cy.get('button[type="submit"]').click()
    cy.get('.success').should('be.visible')
  })
  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {
    cy.get('#firstName').type(this.user.firstName)
    cy.get('#lastName').type(this.user.lastName)
    cy.get('#email').type('e-mail invalido')
    cy.get('#open-text-area').type(this.user.longText, { delay: 0 })
    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')
  })
  it('campo telefone deve conter apenas números', function () {
    cy.get('#firstName').type(this.user.firstName)
    cy.get('#lastName').type(this.user.lastName)
    cy.get('#email').type(this.user.email)
    cy.get('#telefone').should('have.value', '123')
    cy.get('#open-text-area').type(this.user.longText, { delay: 0 })
    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')
  })
})
