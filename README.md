# UC7-Store
Projeto da Unidade Curricular 7 do Técnico em Informática para Internet do Senac PR - UEPT 9 - Turma 202400002 

## Briefing do Projeto
A aprendizagem baseada em projetos seguirá o seguinte cronograma, com cada encontro contendo uma hora de aula expositiva e três de prática relacionada ao projeto. O briefing do que deve ser feito em cada sprint segue:
### Primeiro Sprint
- Definição do Escopo, Requisitos Funcionais e Não-Funcionais. Criação do repositório no Github. Construção do mapa do site. 
- Criação dos wireframes, criação do HTML das páginas.
- Criação do CSS das páginas. 
- Criação do Javascript do lado de cliente das páginas para interatividade no front-end. Criação do servidor web que serve (a princípio) só o conteúdo estático das páginas.
- Criação do banco de dados documental de usuários com senhas e de produtos com imagens, nomes, descrições e preços.
### Segundo Sprint
- Fazer um formulário de cadastro de usuários. Preencher o formulário e enviar por HTTP para o servidor. Fazer a criação do usuário no servidor ao receber uma requisição HTTP de cadastro.
- Criar um formulário de login e um componente dinâmico no front-end que identifica quem está logado. Criar um botão de logout.
- Utilizar session e cookies para lembrar quem está logado. Implementar gerenciamento de sessão e cookies seguindo a LGPD.
- Implementar um carrinho, parte estática da página.
- Implementar um carrinho, parte dinâmica da página e código do servidor lidando com requisições POST assíncronas. 
### Terceiro Sprint
- Implementar o checkout, salvar os detalhes do endereço e detalhes de pagamento. Resumo do pedido com o valor total.
- Processamento do pagamento usando um mock provider.
- Confirmação do pedido por email. Registro dos pedidos feitos no banco de dados.
### Quarto Sprint
- Confidencialidade dos dados: Autenticação em dois fatores.
- Integridade dos dados: hashing das senhas.
- Conexões seguras com HTTPS.
- Disponibilidade (Availability) dos dados: automação de backup do banco de dados.
- Teste IAST
- Teste de penetração
