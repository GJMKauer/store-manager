const sinon = require('sinon');
const { expect } = require('chai');

const ProductsModel = require('../../../models/ProductsModel');
const connection = require('../../../models/connection');

const mockAllProducts = [[
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
  },
], []];

const mockIdProduct = [[{
  "id": 1,
  "name": "Martelo de Thor"
}], []];

const notFoundByIdProducts = [[], []];

const createdProduct = [{
  fieldCount: 0,
  affectedRows: 1,
  insertId: 5,
  info: '',
  serverStatus: 2,
  warningStatus: 0
}, undefined];

describe('Testes da Camada de Models - Products', () => {
  describe('Quando realizar uma busca por todos os produtos', () => {
    describe('Quando os produtos são encontrados', () => {
      beforeEach(async () => {
        sinon.stub(connection, 'query').resolves(mockAllProducts);
      });

      afterEach(async () => {
        connection.query.restore();
      });

      it('Retorna um array na função getAllProducts', async () => {
        const result = await ProductsModel.getAllProducts();
        expect(result).to.be.an('array');
      });

      it('Retorna todos os produtos corretamente', async () => {
        const result = await ProductsModel.getAllProducts();
        expect(result).to.be.equal(mockAllProducts[0]);
      });
    });
  });

  describe('Quando realizar uma busca pelo ID', () => {
    describe('Quando o produto não é encontrado', () => {
      beforeEach(async () => {
        sinon.stub(connection, 'query').resolves(notFoundByIdProducts);
      });

      afterEach(async () => {
        connection.query.restore();
      });

      it('Retorna um array de dois array vazios caso nenhum produto seja encontrado', async () => {
        const result = await ProductsModel.getProductByPk(9);
        expect(result).to.be.deep.equal(notFoundByIdProducts);
      });
    });

    describe('Quando o produto é encontrado', () => {
      beforeEach(async () => {
        sinon.stub(connection, 'query').resolves(mockIdProduct);
      });

      afterEach(async () => {
        connection.query.restore();
      });

      it('Retorna um objeto na função getProductByPk', async () => {
        const result = await ProductsModel.getProductByPk(1);
        expect(result).to.be.an('object');
      });

      it('O produto retornado tem as propriedades "id" e "name"', async () => {
        const result = await ProductsModel.getProductByPk(1);
        expect(result).to.include.all.keys('id', 'name');
      });

      it('O produto retornado é o correto', async () => {
        const result = await ProductsModel.getProductByPk(1);
        expect(result).to.be.equal(mockIdProduct[0][0]);
      });
    });
  });

  describe('Ao inserir um produto no banco de dados', () => {
    describe('Quando eu insiro com sucesso', () => {
      beforeEach(async () => {
        sinon.stub(connection, 'query').resolves(createdProduct);
      });

      afterEach(async () => {
        connection.query.restore();
      });

      it('Retorna um objeto com as keys "affectedRows" e "insertId"', async () => {
        const result = await ProductsModel.createProduct('Teste123');
        expect(result).to.include.all.keys('affectedRows', 'insertId');
      });

      it('Espera que as chaves "affectedRows" e "insertId" não sejam iguais a 0', async () => {
        const { affectedRows, insertId} = await ProductsModel.createProduct('Teste123');
        expect(affectedRows).not.to.be.equal(0);
        expect(insertId).not.to.be.equal(0);
      });
    });
  });

  describe('Ao atualizar um produto no banco de dados', () => {
    describe('Quando eu atualizo com sucesso', () => {
      beforeEach(async () => {
        sinon.stub(connection, 'query').resolves(createdProduct);
      });

      afterEach(async () => {
        connection.query.restore();
      });

      it('Retorna um objeto com as keys "affectedRows" e "insertId"', async () => {
        const result = await ProductsModel.updateProduct('Teste123');
        expect(result).to.include.all.keys('affectedRows', 'insertId');
      });

      it('Espera que as chaves "affectedRows" e "insertId" não sejam iguais a 0', async () => {
        const { affectedRows, insertId } = await ProductsModel.updateProduct('Teste123');
        expect(affectedRows).not.to.be.equal(0);
        expect(insertId).not.to.be.equal(0);
      });
    });
  });

  describe('Ao deletar um produto no banco de dados', () => {
    describe('Quando eu deleto com sucesso', () => {
      beforeEach(async () => {
        sinon.stub(connection, 'query').resolves(createdProduct);
      });

      afterEach(async () => {
        connection.query.restore();
      });

      it('Retorna um objeto com as keys "affectedRows" e "insertId"', async () => {
        const result = await ProductsModel.deleteProduct('Teste123');
        expect(result).to.include.all.keys('affectedRows', 'insertId');
      });

      it('Espera que as chaves "affectedRows" e "insertId" não sejam iguais a 0', async () => {
        const { affectedRows, insertId } = await ProductsModel.deleteProduct('Teste123');
        expect(affectedRows).not.to.be.equal(0);
        expect(insertId).not.to.be.equal(0);
      });
    });
  });

  describe('Ao pesquisar um produto no banco de dados através do nome', () => {
    describe('Quando eu pesquiso com sucesso', () => {
      beforeEach(async () => {
        sinon.stub(connection, 'query').resolves(mockIdProduct);
      });

      afterEach(async () => {
        connection.query.restore();
      });

      it('Retorna um objeto na função searchProduct', async () => {
        const result = await ProductsModel.searchProduct('Martelo');
        expect(result).to.be.an('array');
      });

      it('O produto retornado tem as propriedades "id" e "name"', async () => {
        const result = await ProductsModel.searchProduct('Martelo');
        expect(result[0]).to.include.all.keys('id', 'name');
      });

      it('O produto retornado é o correto', async () => {
        const result = await ProductsModel.searchProduct('Martelo');
        expect(result[0]).to.be.equal(mockIdProduct[0][0]);
      });
    });
  });
});