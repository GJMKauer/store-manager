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

      it('Retorna um array na função getAll', async () => {
        const result = await ProductsModel.getAll();
        expect(result).to.be.an('array');
      });

      it('Retorna todos os produtos corretos', async () => {
        const result = await ProductsModel.getAll();
        expect(result).to.be.equal(mockAllProducts[0]);
      });
    });
  });

  describe('Quando realizar uma busca pelo ID', () => {
    describe('Quando os produtos não são encontrados', () => {
      beforeEach(async () => {
        sinon.stub(connection, 'query').resolves(notFoundByIdProducts);
      });

      afterEach(async () => {
        connection.query.restore();
      });

      it('Retorna um array de dois array vazios caso nenhum produto seja encontrado', async () => {
        const result = await ProductsModel.getByPk(9);
        expect(result).to.be.deep.equal(notFoundByIdProducts);
      });
    });

    describe('Quando os produtos são encontrados', () => {
      beforeEach(async () => {
        sinon.stub(connection, 'query').resolves(mockIdProduct);
      });

      afterEach(async () => {
        connection.query.restore();
      });

      it('Retorno um objeto na função getByPk', async () => {
        const result = await ProductsModel.getByPk(1);
        expect(result).to.be.an('object');
      });

      it('O produto retornado tem as propriedades "id" e "name"', async () => {
        const result = await ProductsModel.getByPk(1);
        expect(result).to.include.all.keys('id', 'name');
      });

      it('O produto retornado é o correto', async () => {
        const result = await ProductsModel.getByPk(1);
        expect(result).to.be.equal(mockIdProduct[0][0]);
      });
    });
  });

  describe('Quando eu inserir um produto no banco de dados', () => {
    describe('Quando eu insiro com sucesso', () => {
      beforeEach(async () => {
        sinon.stub(connection, 'query').resolves(createdProduct);
      });

      afterEach(async () => {
        connection.query.restore();
      });

      it('Retorna um objeto com as keys "affectedRows" e "insertId"', async () => {
        const result = await ProductsModel.create('Teste123');
        expect(result).to.include.all.keys('affectedRows', 'insertId');
      });

      it('Espera que as chaves "affectedRows" e "insertId" não sejam iguais a 0', async () => {
        const { affectedRows, insertId} = await ProductsModel.create('Teste123');
        expect(affectedRows).not.to.be.equal(0);
        expect(insertId).not.to.be.equal(0);
      });
    });
  });
});