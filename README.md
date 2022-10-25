# Boas vindas ao repositório do projeto <b>Store Manager</b>!

Esse projeto foi desenvolvido durante o módulo de Backend na Trybe! #vqv 

Aqui você vai encontrar os detalhes de como foi o desenvolvimento do projeto e quais foram os requisitos técnicos necessários para a entrega do desafio.

---

# Habilidades desenvolvidas

Neste projeto, fui capaz de:

- Desenvolver uma API utilizando a arquitetura MSC (Model - Service - Controller).

---

# CRUD

CRUD é um acrônimo para **C**reate, **R**ead, **U**pdate and **D**elete. Em português seria **Criar**, **Ler**, **Atualizar** e **Deletar** registros. Nesse projeto trabalhamos diretamente com a manipulação no banco de dados MySQL, utilizando das funções de connection.query e connection.execute, com os array de binding para a inserção de dados no banco.

---

# MSC

MSC é um acrônimo para **M**odel, **S**ervices e **C**ontroller. A utilização dessas camadas facilita a manutenção e legibilidade no código, uma vez que cada camada é responsável por apenas uma função. A camada Controller é responsável por retornar as requisições e respostas de nossa API para o usuário, enquanto que a camada Model faz as queries necessárias diretamente ao banco de dados. Já o Service é responsável por fazer a intermediação entre as duas camadas, podendo agir como regulador das regras de negócio da aplicação e lançar erros em caso de algum problema na requisição ou query.

---

# Funcionamento da aplicação

Para iniciar o projeto, é necessário possuir o [Docker](https://docs.docker.com/engine/install/ubuntu/) instalado.

Após clonar o projeto em seu computador, para iniciá-lo é necessário executar o comando
```
docker-compose up -d && docker exec -it store_manager bash
```
e na sequência execute esses comandos, um por vez
```
npm install
npm run migration
npm run seed
npm run debug
```
na pasta raíz do projeto. Isso fará com que os containers docker sejam orquestrados e a aplicação esteja disponível.

Após isso, você pode realizar as requisições de CRUD através de algum cliente HTTP, como o `Insomnia`, o `Postman`, o `HTTPie` ou até mesmo extensões do VSCode como o `Thunder Client` através dos enpoints listados abaixo.

O projeto trata-se de um desafio para consolidar o aprendizado do modelo de Camadas MSC em Express, com o desenvolvimento de uma API utilizando os conceitos de CRUD para leitura, cadastro, atualização e remoção de dados Produtos e Vendas diretamente no Banco de Dados.

Também foram desenvolvidos testes com cobertura de 100% do projeto utilizando as ferramentas **Mocha**, **Chai** e **Sinon** em conjunto. Para executar os testes do projeto, é necessário executar o comando
```
npm run test:mocha
```
que serão exibidos todos os testes criados por mim para a obtenção de 100% de cobertura do projeto.

Também foi utilizado o conceito de middlewares para validação das requisições; ao tentar submeter uma requisição com dados inválidos ou qualquer informação que possa gerar um erro, essa submissão é levada até o middleware que retorna um sinal de erro para o usuário, informando-o o tipo de erro para que ele corrija e realize a requisição novamente.

---

## 📚 Documentação (endpoints)

### 🛒 Products
| Método | Funcionalidade                            | URL                            |
| ------ | ----------------------------------------- | ------------------------------ |
| `GET`  | Retorna uma lista de produtos cadastrados | http://localhost:3000/products |

<details>
  <summary>A resposta da requisição é a seguinte, com status 200:</summary>

```
[
  {
    "id": 1,
    "name": "Martelo de Thor"
  },
  {
    "id": 2,
    "name": "Traje de encolhimento"
   },
  {
    "id": 3,
    "name": "Escudo do Capitão América"
  }
]
```

</details>
<br>
<br>

| Método | Funcionalidade                                             | URL                                |
| ------ | ---------------------------------------------------------- | ---------------------------------- |
| `GET`  | Retorna um produto pelo id (substitua `:id` por um número) | http://localhost:3000/products/:id |

<details>
  <summary>A resposta da requisição é a seguinte, com status 200:</summary>

```
{
  "id": 1,
  "name": "Martelo de Thor"
}
```

</details>

<details>
  <summary>A requisição irá falhar nos seguintes casos:</summary>
  - A rota retorna o código <code>404</code>, com a mensagem <code>Product not found</code> caso tente acessar um id não existente no banco.<br>
</details>
<br>
<br>

| Método | Funcionalidade                           | URL                            |
| ------ | ---------------------------------------- | ------------------------------ |
| `POST` | Insere um novo produto no banco de dados | http://localhost:3000/products |

<details>
  <summary>A estrutura do <code>body</code> da requisição deverá seguir o padrão abaixo:</summary>

```
{
  "name": "ProdutoX"
}
```

</details>

<details>
  <summary>A resposta da requisição é a seguinte, com status 201:</summary>

```
{
  "id": 4,
  "name": "ProdutoX"
}
```

</details>

<details>
  <summary>A requisição irá falhar nos seguintes casos:</summary>
  - A rota retorna o código <code>400</code>, com a mensagem <code>"name" is required</code> caso o campo name não seja informado no body da requisição;<br>
  - A rota retorna o código <code>422</code>, com a mensagem <code>"name" length must be at least 5 characters long</code> caso o campo name tenha menos de 5 caracteres no body da requisição.<br>
</details>
<br>
<br>

| Método | Funcionalidade                                                                    | URL                                |
| ------ | --------------------------------------------------------------------------------- | ---------------------------------- |
| `PUT`  | Atualiza um produto no banco de dados pelo seu id (substitua `:id` por um número) | http://localhost:3000/products/:id |

<details>
  <summary>A estrutura do <code>body</code> da requisição deverá seguir o padrão abaixo:</summary>

```
{
  "name": "Martelo do Batman"
}
```

</details>

<details>
  <summary>A resposta da requisição é a seguinte, com status 200:</summary>

```
{
  "id": 1,
  "name": "Martelo do Batman"
}
```

</details>

<details>
  <summary>A requisição irá falhar nos seguintes casos:</summary>
  - A rota retorna o código <code>400</code>, com a mensagem <code>"name" is required</code> caso o campo name não seja informado no body da requisição;<br>
  - A rota retorna o código <code>422</code>, com a mensagem <code>"name" length must be at least 5 characters long</code> caso o campo name tenha menos de 5 caracteres no body da requisição;<br>
  - A rota retorna o código <code>404</code>, com a mensagem <code>Product not found</code> caso tente acessar um id não existente no banco.<br>
</details>
<br>
<br>

| Método   | Funcionalidade                                                      | URL                                |
| -------- | ------------------------------------------------------------------- | ---------------------------------- |
| `DELETE` | Remove um produto do banco de dados (substitua `:id` por um número) | http://localhost:3000/products/:id |

<details>
  <summary>A rota retorna o status 204, <code>sem resposta</code>.</summary>
</details>

<details>
  <summary>A requisição irá falhar nos seguintes casos:</summary>
  - A rota retorna o código <code>404</code>, com a mensagem <code>Product not found</code> caso tente acessar um id não existente no banco.<br>
</details>
<br>
<br>

| Método | Funcionalidade                                                                                    | URL                                                 |
| ------ | ------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| `GET`  | Retorna uma lista de produtos com base em um filtro (substitua `searchTerm` pelo nome do produto) | http://localhost:3000/products/search/q?=searchTerm |

<details>
  <summary>A resposta da requisição é a seguinte, com status 200:</summary>

```
// GET /products/search?q=Martelo

[
  {
    "id": 1,
    "name": "Martelo de Thor",
  }
]
```

</details>
<br>
<br>

### 💸 Sales
| Método | Funcionalidade                          | URL                         |
| ------ | --------------------------------------- | --------------------------- |
| `GET`  | Retorna uma lista de vendas cadastradas | http://localhost:3000/sales |

<details>
  <summary>A resposta da requisição é a seguinte, com status 200:</summary>
  
```
[
  {
    "saleId": 1,
    "productId": 1,
    "quantity": 5,
    "date": "2022-10-25T21:03:44.000Z"
  },
  {
    "saleId": 1,
    "productId": 2,
    "quantity": 10,
    "date": "2022-10-25T21:03:44.000Z"
  },
  {
    "saleId": 2,
    "productId": 3,
    "quantity": 15,
    "date": "2022-10-25T21:03:44.000Z"
  }
]
```

</details>
<br>
<br>

| Método | Funcionalidade                                           | URL                             |
| ------ | -------------------------------------------------------- | ------------------------------- |
| `GET`  | Retorna uma venda pelo id (substitua `id` por um número) | http://localhost:3000/sales/:id |

<details>
  <summary>A resposta da requisição é a seguinte, com status 200:</summary>
  
```
[
  {
    "productId": 1,
    "quantity": 5,
    "date": "2022-10-25T21:03:44.000Z"
  },
  {
    "productId": 2,
    "quantity": 10,
    "date": "2022-10-25T21:03:44.000Z"
  }
]
```

</details>
<br>
<br>

| Método | Funcionalidade                       | URL                         |
| ------ | ------------------------------------ | --------------------------- |
| `POST` | Adiciona uma venda no banco de dados | http://localhost:3000/sales |

<details>
  <summary>A estrutura do <code>body</code> da requisição deverá seguir o padrão abaixo:</summary>

```
[
  {
    "productId": 1,
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 5
  }
]
```

</details>

<details>
  <summary>A resposta da requisição é a seguinte, com status 201:</summary>
  
```
{
  "id": 3,
  "itemsSold": [
    {
      "productId": 1,
      "quantity": 1
    },
    {
      "productId": 2,
      "quantity": 5
    }
  ]
}
```

</details>

<details>
  <summary>A requisição irá falhar nos seguintes casos:</summary>
  - A rota retorna o código <code>400</code>, com a mensagem <code>"productId" is required</code> caso algum dos itens na lista de vendas não possua o campo productId no body da requisição;<br>
  - A rota retorna o código <code>400</code>, com a mensagem <code>"quantity" is required</code> caso algum dos itens na lista de vendas não possua o campo quantity no body da requisição;<br>
  - A rota retorna o código <code>400</code>, com a mensagem <code>"quantity" must be greater than or equal to 1</code> caso algum dos itens na lista de vendas possua o campo quantity com valor abaixo de 1 no body da requisição;<br>
  - A rota retorna o código <code>404</code>, com a mensagem <code>Product not found</code> caso tente acessar um id não existente no banco.<br>
</details>
<br>
<br>

| Método | Funcionalidade                                                      | URL                             |
| ------ | ------------------------------------------------------------------- | ------------------------------- |
| `PUT`  | Atualiza uma venda no banco de dados (substitua `id` por um número) | http://localhost:3000/sales/:id |

<details>
  <summary>A estrutura do <code>body</code> da requisição deverá seguir o padrão abaixo:</summary>

```
[
  {
    "productId": 1,
    "quantity": 10
  },
  {
    "productId": 2,
    "quantity": 50
  }
]
```

</details>

<details>
  <summary>A resposta da requisição é a seguinte, com status 200:</summary>
  
```
"saleId": 1,
  "itemsUpdated": [
    {
      "productId": 1,
      "quantity":10
    },
    {
      "productId": 2,
      "quantity":50
    }
  ]
```

</details>

<details>
  <summary>A requisição irá falhar nos seguintes casos:</summary>
  - A rota retorna o código <code>400</code>, com a mensagem <code>"productId" is required</code> caso algum dos itens na lista de vendas não possua o campo productId no body da requisição;<br>
  - A rota retorna o código <code>400</code>, com a mensagem <code>"quantity" is required</code> caso algum dos itens na lista de vendas não possua o campo quantity no body da requisição;<br>
  - A rota retorna o código <code>400</code>, com a mensagem <code>"quantity" must be greater than or equal to 1</code> caso algum dos itens na lista de vendas possua o campo quantity com valor abaixo de 1 no body da requisição;<br>
  - A rota retorna o código <code>404</code>, com a mensagem <code>Sale not found</code> caso tente acessar um id não existente no banco.<br>
</details>
<br>
<br>

| Método   | Funcionalidade                                                      | URL                                |
| -------- | ------------------------------------------------------------------- | ---------------------------------- |
| `DELETE` | Remove uma venda do banco de dados (substitua `:id` por um número) | http://localhost:3000/sales/:id |

<details>
  <summary>A rota retorna o status 204, <code>sem resposta</code>.</summary>
</details>

<details>
  <summary>A requisição irá falhar nos seguintes casos:</summary>
  - A rota retorna o código <code>404</code>, com a mensagem <code>Sale not found</code> caso tente acessar um id não existente no banco.<br>
</details>

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
