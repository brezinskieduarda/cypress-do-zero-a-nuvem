import { faker } from '@faker-js/faker'

describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(function () {
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

  it('verifica o título da aplicação', function () {
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
    cy.get('#phone-checkbox').check()
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

  it('utilizando cy.contains para identificar elementos', function () {
    cy.get('#firstName').type(this.user.firstName)
    cy.get('#lastName').type(this.user.lastName)
    cy.get('#email').type(this.user.email)
    cy.get('#phone-checkbox').click()
    cy.get('#open-text-area').type(this.user.longText, { delay: 0 })
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
  })

  it('seleciona um produto (YouTube) por seu texto', function () {
    cy.get('#firstName').type(this.user.firstName)
    cy.get('#lastName').type(this.user.lastName)
    cy.get('#email').type(this.user.email)
    cy.get('#phone').type(this.user.phone)
    cy.get('#product').select(['YouTube'])
    cy.get('#phone-checkbox').click()
    cy.get('#open-text-area').type(this.user.longText, { delay: 0 })
    cy.get('#product').invoke('val').should('eq', 'youtube')
  })

  it('seleciona um produto (Mentoria) por seu valor (value)', function () {
    cy.get('#firstName').type(this.user.firstName)
    cy.get('#lastName').type(this.user.lastName)
    cy.get('#email').type(this.user.email)
    cy.get('#phone').type(this.user.phone)
    cy.get('#product').select('mentoria')
    cy.get('#phone-checkbox').click()
    cy.get('#open-text-area').type(this.user.longText, { delay: 0 })
    cy.get('#product').should('have.value', 'mentoria')
  })

  it('seleciona um produto (Blog) por seu índice', function () {
    cy.get('#firstName').type(this.user.firstName)
    cy.get('#lastName').type(this.user.lastName)
    cy.get('#email').type(this.user.email)
    cy.get('#phone').type(this.user.phone)
    cy.get('#product').select(1)
    cy.get('#phone-checkbox').click()
    cy.get('#open-text-area').type(this.user.longText, { delay: 0 })
    cy.get('#product').should('have.value', 'blog')
  })

  it('marca o tipo de atendimento "Feedback"', function () {
    cy.get('#firstName').type(this.user.firstName)
    cy.get('#lastName').type(this.user.lastName)
    cy.get('#email').type(this.user.email)
    cy.get('#phone').type(this.user.phone)
    cy.get('#product').select(1)
    cy.get('input[type="radio"][value="feedback"]').check('feedback')
    cy.get('#phone-checkbox').click()
    cy.get('#open-text-area').type(this.user.longText, { delay: 0 })
    cy.get('input[type="radio"][value="feedback"]').should('have.value', 'feedback')
  })

  it('marca cada tipo de atendimento', function () {
    cy.get('input[type="radio"][value="ajuda"]').check().should('be.checked')
    cy.get('input[type="radio"][value="elogio"]').check().should('be.checked')
    cy.get('input[type="radio"][value="feedback"]').check().should('be.checked')
  })

  it('marca cada tipo de atendimento radio - utiliza each e wrap', function () {
    cy.get('input[type="radio"]').each(typeOfService => {
      cy.wrap(typeOfService).check().should('be.checked')
    })
  })

  it('marca ambos checkboxes, depois desmarca todos', function () {
    cy.get('input[type="checkbox"]').each(typeOfService => {
      cy.wrap(typeOfService).check().should('be.checked').uncheck().should('not.be.checked')
    })
  })

  it('marca ambos checkboxes, depois desmarca o último', function () {
    cy.get('#check > [name="email"]').check()
    cy.get('#check > [name="phone"]').check().should('be.checked').uncheck()
    cy.get('#check > [name="email"]').should('be.checked')
    cy.get('#check > [name="phone"]').should('not.be.checked')
  })

  it('marcar dois checks ao mesmo tempo', function () {
    cy.get('input[type="checkbox"]').check().should('be.checked').last().uncheck().should('not.be.checked')
  })

  it('seleciona um arquivo da pasta fixtures', function () {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/example.txt')
  })

  it('seleciona um arquivo simulando um drag-and-drop', function () {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/example.txt', { action: 'drag-drop' })
  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function () {
    cy.fixture('example.txt').as('myexample')
    cy.get('input[type="file"]').selectFile('@myexample')
  })

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function () {
    cy.get('a[href="privacy.html"]').should('have.attr', 'target', '_blank')
  })

  it('acessa a página da política de privacidade removendo o target e então clicando no link', function () {
    cy.get('a[href="privacy.html"]').invoke('removeAttr', 'target').click()
    cy.url().should('include', 'privacy.html')
  })

  it('testa a página da política de privacidade de forma independente', function () {
    cy.visit('./src/privacy.html')
    cy.contains('CAC TAT - Política de Privacidade').should('be.visible')
  })
})
