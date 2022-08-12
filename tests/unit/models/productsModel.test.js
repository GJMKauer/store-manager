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

const mockIdProduct = [{
  "id": 1,
  "name": "Martelo de Thor"
}, []];

const notFoundByIdProducts = [[], []];

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

      it('Retorna nulo caso nenhum produto seja encontrado', async () => {
        const result = await ProductsModel.getByPk(9);
        expect(result).to.be.equal(notFoundByIdProducts);
      });
    });

    describe('Quando os produtos são encontrados', () => {
      beforeEach(async () => {
        sinon.stub(connection, 'query').resolves(mockIdProduct);
      });

      afterEach(async () => {
        connection.query.restore();
      });

      it('Retorna um array na função getByPk', async () => {
        const result = await ProductsModel.getByPk(1);
        expect(result).to.be.an('array');
      });

      it('O produto retornado tem as propriedades "id" e "name"', async () => {
        const result = await ProductsModel.getByPk(1);
        expect(result[0]).to.include.all.keys('id', 'name');
      });

      it('O produto retornado é o correto', async () => {
        const result = await ProductsModel.getByPk(1);
        expect(result[0]).to.be.equal(mockIdProduct[0]);
      });
    });
  }); 
});