describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach (() => {
    cy.visit('./src/index.html')
  })

  it('verifica o titulo da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  // Seção 3 - Exercício extra 1 e 8
it('preenche os campos obrigatórios e envia o formulário', () => {
    cy.get('#firstName').type('Isabelle')
    cy.get('#lastName').type('Amaral')
    cy.get('#email').type('isa.novais.dev@gmail.com')
    cy.get('#open-text-area').type('Obrigada por testar a aplicação.')
    cy.contains('button', 'Enviar').click()

    cy.get('.success').should('be.visible')
  })

  // Seção 3 - Exercício extra 1 e 8
  it('preenche os campos obrigatórios e envia o formulário', () => {
    const longText = Cypress._.repeat('abcdefghijklmnopqrstuvwxyz', 10)

    cy.get('#firstName').type('Isabelle')
    cy.get('#lastName').type('Amaral')
    cy.get('#email').type('isa.novais.dev@gmail.com')
    cy.get('#open-text-area').type(longText, { delay: 0 })
    cy.contains('button', 'Enviar').click()

    cy.get('.success').should('be.visible')
  })

  // Seção 3 - Exercício extra 2 e 8
  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#email').type('isabelle.novais')
    cy.contains('button', 'Enviar').click()
    
    cy.get('.error').should('be.visible')
  })
  
  // Seção 3 - Exercício extra 3 e 8
  it('se um número não-numérico for digitado, seu valor continuará vazio', () =>{
    cy.get('#phone').type('isabelle')
    cy.contains('button', 'Enviar').click()

    cy.get('input').should('have.value', '')
  })

  // Seção 3 - Exercício extra 4 e 8
  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName').type('Isabelle')
    cy.get('#lastName').type('Amaral')
    cy.get('#email').type('isa.novais.dev@gmail.com')
    cy.get('#phone-checkbox[type="checkbox"]').check()
    cy.get('#open-text-area').type('Obrigada por testar a aplicação.')
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })

  // Seção 3 - Exercício extra 5
  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName')
      .type('Isabelle')
      .should('have.value', 'Isabelle')
      .clear()
      .should('have.value', '')
    cy.get('#lastName')
      .type('Amaral')
      .should('have.value', 'Amaral')
      .clear()
      .should('have.value', '')
    cy.get('#email')
      .type('isa.novais.dev@gmail.com')
      .should('have.value', 'isa.novais.dev@gmail.com')
      .clear()
      .should('have.value', '')
    cy.get('#phone')
      .type('37998713682')
      .should('have.value', '37998713682')
      .clear()
      .should('have.value', '')
  })

  // Seção 3 - Exercício extra 6 e 8
  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
  })

  // Seção 3 - Exercicio extra 7.1 e 7.2
  it('envia o formulário com sucesso usando um comando customizado', () => {
    const data = {
      firstName: 'Isabelle',
      lastName: 'Amaral',
      email: 'isa.amaraldroid@gmail.com',
      text: 'Teste de informações.'
    }
    
    cy.fillMandatoryFieldsAndSubmit(data)

    cy.get('.success').should('be.visible')
  })

  // Seção 3 - Exercício extra 7.3
  it('envia o formulário com sucesso usando um comando customizado', () => {
    cy.fillMandatoryFieldsAndSubmit()

    cy.get('.success').should('be.visible')
  })

  // Seção 4 - Exercício 1
  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product')
      .select('YouTube') //selecionando pelo texto
      .should('have.value', 'youtube')
  })

  // Seção 4 - Exercício extra 1
  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product')
      .select('mentoria') //selecionando pelo valor
      .should('have.value', 'mentoria')
  })

  // Seção 4 - Exercício extra 2
  it('seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product')
      .select(1) //selecionando pelo índice
      .should('have.value', 'blog')
  })

  // Seção 5  -Exercício 1
  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('be.checked')
  })

  // Seção 5 - Exercício extra
  it('marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]')
      .each(typeOfService => {
        cy.wrap(typeOfService)
          .check()
          .should('be.checked')
      })
  })

  // Seção 6 - Exercício
  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
  })

  // Seção 6 - Exercício extra
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName').type('Isabelle')
    cy.get('#lastName').type('Amaral')
    cy.get('#email').type('isa.novais.dev@gmail.com')
    cy.get('#phone-checkbox[type="checkbox"]').check()
    cy.get('#open-text-area').type('Obrigada por testar a aplicação.')
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })

  // Seção 7 - Exercício
  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('input[type="file"]')
      .selectFile('cypress/fixtures/example.json')
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  // Seção 7 - Exercício extra 1
  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('input[type="file"]')
      .selectFile('cypress/fixtures/example.json', { action: "drag-drop"})
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  // Seção 7 - Exercício extra 2
  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json').as('exampleFile')
    cy.get('input[type="file"]')
      .selectFile('@exampleFile')
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  // Seção 8 - Exercício (Alternativa 1)
  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.contains('a', 'Política de Privacidade')
      .should('have.attr', 'href', 'privacy.html')
      .and('have.attr', 'target', '_blank')
  })

  // Seção 8 - Exercício extra 1 (Alternativa 2)
  it('acessa a página da política de privacidade removendo o target e então clicando no link', () =>{
    cy.contains('a', 'Política de Privacidade')
      .invoke('removeAttr', 'target')
      .click()

    cy.contains('h1', 'CAC TAT - Política de Privacidade')
      .should('be.visible')
  })

  // Seção 8 - Desafio
  // Arquivo privacyPolicy.cy.js
  it('testa a página da política de privacidade de forma independente', () => {
    cy.contains('a', 'Política de Privacidade')
      .click()
  })

  // Seção 9 - Exercício e Exercício extra
  // Ajuste em package.json (adição dos scripts   cy:open:mobile   e   test:mobile)

  // Seção 10 - 
  it.only('', () => {

  })
})