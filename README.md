# Boas vindas ao repositório do projeto <b>Store Manager</b>!

Esse projeto foi desenvolvido durante o módulo de Backend na Trybe! #vqv 

Aqui você vai encontrar os detalhes de como foi o desenvolvimento do projeto e quais foram os requisitos técnicos necessários para a entrega do desafio.

---

# Habilidades desenvolvidas

Neste projeto, fui capaz de:

- Desenvolver uma API utilizando a arquitetura MSC (Model - Service - Controller).

---

# CRUD

CRUD é um acrônimo para **C**reate, **R**ead, **U**pdate and **D**elete. Em português seria **Criar**, **Ler**, **Atualizar** e **Deletar** registros. Nesse projeto ainda não trabalhamos diretamente com um banco de dados para realizar estas operações do CRUD, mas utilizamos um arquivo JSON através da manipulação com o módulo fs do Node.js, para consolidar melhor os conhecimentos.

---

# MSC

MSC é um acrônimo para **M**odel, **S**ervices e **C**ontroller. A utilização dessas camadas facilita a manutenção e legibilidade no código, uma vez que cada camada é responsável por apenas uma função. A camada Controller é responsável por retornar as requisições e respostas de nossa API para o usuário, enquanto que a camada Model faz as queries necessárias diretamente ao banco de dados. Já o Service é responsável por fazer a intermediação entre as duas camadas, podendo agir como regulador das regras de negócio da aplicação e lançar erros em caso de algum problema na requisição ou query.

---

# Funcionamento da aplicação

Para iniciar o projeto, é necessário possuir o [Docker](https://docs.docker.com/engine/install/ubuntu/) instalado.

Antes de iniciar o projeto, é necessário instalar as dependências dele com o comando
```
npm install
```

Para rodar o projeto, é necessário executar o comando
```
docker-compose up -d
```
na raíz do projeto. Isso fará com que os containers docker sejam orquestrados e a aplicação esteja disponível. Esse comando deve ser executado via terminal dentro do diretório onde está o arquivo **docker-compose.yml**. Após os containers estarem funcionando, você pode realizar as requisições do CRUD através de algum cliente HTTP, como o Insomnia, o Postman, o HTTPie ou até mesmo extensões como o Thunder Client, do VS Code).

O projeto trata-se de um desafio para consolidar o aprendizado do modelo de Camadas MSC em Express, com o desenvolvimento de uma API utilizando os conceitos de CRUD para leitura, cadastro, atualização e remoção de dados Produtos e Vendas diretamente no Banco de Dados.

Também foram desenvolvidos testes com cobertura de 100% do projeto utilizando as ferramentas **Mocha**, **Chai** e **Sinon** em conjunto. Para executar os testes do projeto, é necessário executar o comando
```
npm run test:mocha
```
que serão exibidos todos os testes criados por mim para a obtenção de 100% de cobertura do projeto.

Também foi utilizado o conceito de middlewares para validação das requisições; ao tentar submeter uma requisição com dados inválidos ou qualquer informação que possa gerar um erro, essa submissão é levada até o middleware que retorna um sinal de erro para o usuário, informando-o o tipo de erro para que ele corrija e realize a requisição novamente.

---

# Histórico de Commits

É possível verificar todo o histórico de commits do projeto, de modo a visualizar passo-a-passo como foi desenvolvido o meu raciocínio até a finalização do projeto.

---

# Requisitos técnicos do desafio:

- ✅ 1. Crie endpoints para listar produtos.

- ✅ 2. Desenvolva testes que cubram no mínimo 5% das camadas da sua aplicação.

- ✅ 3. Crie endpoint para cadastrar produtos.

- ✅ 4. Crie validações para produtos.
  
- ✅ 5. Desenvolva testes que cubram no mínimo 10% das camadas da sua aplicação.

- ✅ 6. Crie endpoint para validar e cadastrar vendas.

- ✅ 7. Desenvolva testes que cubram no mínimo 15% das camadas da sua aplicação.

- ✅ 8. Crie endpoints para listar vendas.

- ✅ 9. Desenvolva testes que cubram no mínimo 20% das camadas da sua aplicação.

- ✅ 10. Crie endpoint para atualizar um produto.

- ✅ 11. Desenvolva testes que cubram no mínimo 25% das camadas da sua aplicação.

- ✅ 12. Crie endpoint para deletar um produto.

# REQUISITOS BÔNUS

- ✅ 13. Desenvolva testes que cubram no mínimo 30% das camadas da sua aplicação.

- ✅ 14. Crie endpoint para deletar uma venda.

- ✅ 15. Desenvolva testes que cubram no mínimo 35% das camadas da sua aplicação.

- ✅ 16. Crie endpoint para atualizar uma venda.

- ✅ 17. Desenvolva testes que cubram no mínimo 40% das camadas da sua aplicação.

- ✅ 18. Crie endpoint products/search?q=searchTerm.

- ✅ 19. Desenvolva testes que cubram no mínimo 50% das camadas da sua aplicação.

- ✅ 20. Desenvolva testes que cubram no mínimo 60% das camadas da sua aplicação.