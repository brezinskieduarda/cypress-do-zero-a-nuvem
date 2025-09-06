describe('Central de Atendimento ao Cliente TAT', () => {
    beforeEach(() => {
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', () => {

        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })
    it('preenche os campos obrigatórios e envia do formulário', () => {
        cy.get('#firstName').type('Maria')
        cy.get('#lastName').type('Oliveira')
        cy.get('#email').type('m.oli@mail.com')
        cy.get('#open-text-area').type('Texto padrão de texte - Preencher campos obrigatórios')
        cy.get('button[type="submit"]').click()

        cy.get('.success').should('be.visible')
    })
})