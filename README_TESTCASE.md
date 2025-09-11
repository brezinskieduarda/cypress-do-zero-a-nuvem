# Testes Automatizados - Central de Atendimento ao Cliente TAT

## Feature: Formulário de atendimento ao cliente

### IT01 - Verificar título da aplicação
**Scenario:** O título da aplicação deve estar correto
Dado que o usuário acessa a aplicação
Quando a página é carregada
Então o título deve ser "Central de Atendimento ao Cliente TAT"

### IT02 - Preencher campos obrigatórios e enviar formulário
**Scenario:** Preencher campos obrigatórios e enviar formulário com sucesso
Dado que o usuário acessa a aplicação
Quando ele preenche os campos obrigatórios com dados válidos e envia o formulário
Então uma mensagem de sucesso deve ser exibida

### IT03 - Submeter formulário com email inválido
**Scenario:** Validar email inválido
Dado que o usuário acessa a aplicação
Quando ele preenche os campos obrigatórios e insere um email em formato inválido
Então uma mensagem de erro deve ser exibida

### IT04 - Campo telefone não aceita caracteres não numéricos
**Scenario:** Validar campo telefone
Dado que o usuário acessa a aplicação
Quando ele tenta preencher o campo telefone com caracteres não numéricos
Então o campo telefone deve permanecer vazio

### IT05 - Telefone obrigatório não preenchido
**Scenario:** Telefone obrigatório sem preenchimento
Dado que o usuário acessa a aplicação
Quando ele seleciona a opção que torna o telefone obrigatório e envia sem preenchê-lo
Então uma mensagem de erro deve ser exibida

### IT06 - Preencher e limpar campos
**Scenario:** Preencher e limpar campos do formulário
Dado que o usuário acessa a aplicação
Quando ele preenche e limpa os campos de nome, sobrenome, email e descrição
Então os campos devem ser limpos corretamente

### IT07 - Submeter sem preencher campos obrigatórios
**Scenario:** Submissão sem campos obrigatórios
Dado que o usuário acessa a aplicação
Quando ele tenta enviar o formulário sem preencher os campos obrigatórios
Então uma mensagem de erro deve ser exibida

### IT08 - Enviar formulário com comando customizado
**Scenario:** Envio com comando customizado
Dado que o usuário acessa a aplicação
Quando ele utiliza o comando customizado para preencher e enviar o formulário
Então uma mensagem de sucesso deve ser exibida

### IT09 - Submeter utilizando `cy.contains`
**Scenario:** Submissão usando `cy.contains`
Dado que o usuário acessa a aplicação
Quando ele utiliza cy.contains para clicar no botão "Enviar" sem preencher o telefone obrigatório
Então uma mensagem de erro deve ser exibida

### IT10 - Selecionar produto por texto (YouTube)
**Scenario:** Selecionar produto pelo texto
Dado que o usuário acessa a aplicação
Quando ele seleciona o produto "YouTube" por seu texto
Então o valor selecionado deve ser "youtube"

### IT11 - Selecionar produto por valor (Mentoria)
**Scenario:** Selecionar produto pelo value
Dado que o usuário acessa a aplicação
Quando ele seleciona o produto "Mentoria" pelo seu value
Então o valor selecionado deve ser "mentoria"

### IT12 - Selecionar produto por índice (Blog)
**Scenario:** Selecionar produto pelo índice
Dado que o usuário acessa a aplicação
Quando ele seleciona o produto "Blog" por seu índice
Então o valor selecionado deve ser "blog"

### IT13 - Selecionar tipo de atendimento "Feedback"
**Scenario:** Marcar tipo de atendimento Feedback
Dado que o usuário acessa a aplicação
Quando ele seleciona o tipo de atendimento "Feedback"
Então a opção "feedback" deve estar marcada

### IT14 - Selecionar todos os tipos de atendimento
**Scenario:** Marcar todos os tipos de atendimento
Dado que o usuário acessa a aplicação
Quando ele seleciona cada tipo de atendimento (Ajuda, Elogio, Feedback)
Então todos devem estar marcados corretamente

### IT15 - Selecionar tipos de atendimento com `each` e `wrap`
**Scenario:** Marcar radios com each e wrap
Dado que o usuário acessa a aplicação
Quando ele percorre os tipos de atendimento com each e wrap
Então cada um deve ser marcado corretamente

### IT16 - Marcar e desmarcar checkboxes
**Scenario:** Marcar e desmarcar todos os checkboxes
Dado que o usuário acessa a aplicação
Quando ele marca e depois desmarca todos os checkboxes
Então todos devem ser desmarcados

### IT17 - Marcar e desmarcar checkbox específico
**Scenario:** Marcar dois checkboxes e desmarcar o último
Dado que o usuário acessa a aplicação
Quando ele marca os dois checkboxes e desmarca apenas o último
Então apenas o primeiro deve permanecer marcado

### IT18 - Marcar dois checkboxes ao mesmo tempo
**Scenario:** Marcar dois checkboxes e desmarcar o último
Dado que o usuário acessa a aplicação
Quando ele marca dois checkboxes e depois desmarca o último
Então o primeiro deve permanecer marcado

### IT19 - Selecionar arquivo da pasta fixtures
**Scenario:** Selecionar arquivo de fixtures
Dado que o usuário acessa a aplicação
Quando ele seleciona um arquivo da pasta fixtures
Então o arquivo deve ser carregado com sucesso

### IT20 - Selecionar arquivo via drag-and-drop
**Scenario:** Selecionar arquivo simulando drag-and-drop
Dado que o usuário acessa a aplicação
Quando ele seleciona um arquivo simulando drag-and-drop
Então o arquivo deve ser carregado com sucesso

### IT21 - Selecionar arquivo com alias
**Scenario:** Selecionar arquivo usando alias
Dado que o usuário acessa a aplicação
Quando ele utiliza um alias para selecionar o arquivo
Então o arquivo deve ser carregado com sucesso

### IT22 - Verificar link da política de privacidade
**Scenario:** Política de privacidade abre em nova aba
Dado que o usuário acessa a aplicação
Quando ele verifica o link da política de privacidade
Então o link deve abrir em outra aba (target="_blank")

### IT23 - Acessar política de privacidade removendo target
**Scenario:** Remover target e acessar link
Dado que o usuário acessa a aplicação
Quando ele remove o atributo target do link e clica nele
Então a página de política de privacidade deve ser carregada na mesma aba

### IT24 - Acessar página da política de privacidade diretamente
**Scenario:** Acessar página privacy.html diretamente
Dado que o usuário acessa a página privacy.html
Quando a página é carregada
Então o título "CAC TAT - Política de Privacidade" deve estar visível