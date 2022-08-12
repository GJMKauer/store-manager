const sinon = require('sinon');
const { expect } = require('chai');

const ProductsService = require('../../../services/ProductsService');
const ProductsModel = require('../../../models/ProductsModel');

const mockAllProducts = [
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
];

const mockIdProduct = {
  "id": 1,
  "name": "Martelo de Thor"
};

const notFoundByIdProducts = [];

describe('Testes da Camada de Services - Products', () => {
  describe('Quando realizar uma busca por todos os produtos', () => {
    describe('Quando os produtos são encontrados', () => {
      beforeEach(async () => {
        sinon.stub(ProductsModel, 'getAll').resolves(mockAllProducts);
      });

      afterEach(async () => {
        ProductsModel.getAll.restore();
      });

      it('Retorna um array na função getAll', async () => {
        const result = await ProductsService.getAll();
        expect(result).to.be.an('array');
      });

      it('Retorna todos os produtos', async () => {
        const products = await ProductsService.getAll();
        expect(products).to.be.equal(mockAllProducts);
      });
    });
  });

  describe('Quando realizar uma busca pelo ID', () => {
    describe('Quando os produtos não são encontrados', () => {
      beforeEach(async () => {
        sinon.stub(ProductsModel, 'getByPk').resolves(notFoundByIdProducts);
      });

      afterEach(async () => {
        ProductsModel.getByPk.restore();
      });

      it('Retorna nulo caso nenhum produto seja encontrado', async () => {
        const result = await ProductsService.getByPk(9);
        expect(result).to.be.equal(notFoundByIdProducts);
      });
    });
    
    describe('Quando os produtos são encontrados', () => {
      beforeEach(async () => {
        sinon.stub(ProductsModel, 'getByPk').resolves(mockIdProduct);
      });

      afterEach(async () => {
        ProductsModel.getByPk.restore();
      });

      it('Retorna um objeto na função getByPk', async () => {
        const result = await ProductsService.getByPk(1);
        expect(result).to.be.an('object');
      }); 

      it('O produto encontrado é o correto', async () => {
        const result = await ProductsService.getByPk(1);
        expect(result).to.be.equal(mockIdProduct);
      });
    });
  });
});