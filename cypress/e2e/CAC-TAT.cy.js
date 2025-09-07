import { faker } from '@faker-js/faker'

describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html')
    const user = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
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
  it('campo telefone permanece vazio quando preenchido com um valor não numérico', function () {
    cy.get('#firstName').type(this.user.firstName)
    cy.get('#lastName').type(this.user.lastName)
    cy.get('#email').type(this.user.email)
    cy.get('#phone').type('ABC')
    cy.get('#open-text-area').type(this.user.longText, { delay: 0 })

    cy.get('#phone').should('have.value', '')

  })
  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
    cy.get('#firstName').type(this.user.firstName)
    cy.get('#lastName').type(this.user.lastName)
    cy.get('#email').type(this.user.email)
    cy.get('#phone-checkbox').click()
    cy.get('#open-text-area').type(this.user.longText, { delay: 0 })
    cy.get('button[type="submit"]').click()

    cy.get('.error').should('be.visible')

  })
  it('preenche e limpa os campos nome, sobrenome, email e telefone', function () {
    cy.get('#firstName')
      .type(this.user.firstName)
      .should('have.value', this.user.firstName)
      .clear()
      .should('have.value', '')

    cy.get('#lastName')
      .type(this.user.lastName)
      .should('have.value', this.user.lastName)
      .clear()
      .should('have.value', '')

    cy.get('#email')
      .type(this.user.email)
      .should('have.value', this.user.email)
      .clear()
      .should('have.value', '')

    cy.get('#open-text-area')
      .type(this.user.longText, { delay: 0 })
      .should('have.value', this.user.longText)
      .clear()
      .should('have.value', '')

  })
  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function () {
    cy.get('button[type="submit"]').click()

    cy.get('.error').should('be.visible')

  })
  it('envia o formuário com sucesso usando um comando customizado', function () {
    cy.fillMandatoryFieldsAndSubmit()

    cy.get('.success').should('be.visible')

  })
  it.only('utlizando cy_contains para identificar elementos', function () {
    cy.get('#firstName').type(this.user.firstName)
    cy.get('#lastName').type(this.user.lastName)
    cy.get('#email').type(this.user.email)
    cy.get('#phone-checkbox').click()
    cy.get('#open-text-area').type(this.user.longText, { delay: 0 })
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })

})
