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

const createdProduct = {
  fieldCount: 0,
  affectedRows: 1,
  insertId: 5,
  info: '',
  serverStatus: 2,
  warningStatus: 0
};

describe('Testes da Camada de Services - Products', () => {
  describe('Quando realizar uma busca por todos os produtos', () => {
    describe('Quando os produtos são encontrados', () => {
      beforeEach(async () => {
        sinon.stub(ProductsModel, 'getAllProducts').resolves(mockAllProducts);
      });

      afterEach(async () => {
        ProductsModel.getAllProducts.restore();
      });

      it('Retorna um array na função getAllProducts', async () => {
        const result = await ProductsService.getAllProducts();
        expect(result).to.be.an('array');
      });

      it('Retorna todos os produtos', async () => {
        const result = await ProductsService.getAllProducts();
        expect(result).to.be.equal(mockAllProducts);
      });
    });
  });

  describe('Quando realizar uma busca pelo ID', () => {
    describe('Quando o produto não é encontrado', () => {
      beforeEach(async () => {
        sinon.stub(ProductsModel, 'getProductByPk').resolves(notFoundByIdProducts);
      });

      afterEach(async () => {
        ProductsModel.getProductByPk.restore();
      });

      it('Retorna um array vazio caso nenhum produto seja encontrado', async () => {
        const result = await ProductsService.getProductByPk(9);
        expect(result).to.be.equal(notFoundByIdProducts);
      });
    });
    
    describe('Quando o produto é encontrado', () => {
      beforeEach(async () => {
        sinon.stub(ProductsModel, 'getProductByPk').resolves(mockIdProduct);
      });

      afterEach(async () => {
        ProductsModel.getProductByPk.restore();
      });

      it('Retorna um objeto na função getProductByPk', async () => {
        const result = await ProductsService.getProductByPk(1);
        expect(result).to.be.an('object');
      }); 

      it('O produto encontrado é o correto', async () => {
        const result = await ProductsService.getProductByPk(1);
        expect(result).to.be.equal(mockIdProduct);
      });
    });
  });

  describe('Ao inserir um produto no banco de dados', () => {
    describe('Quando eu insiro com sucesso', () => {
      beforeEach(async () => {
        sinon.stub(ProductsModel, 'createProduct').resolves(createdProduct);
      });

      afterEach(async () => {
        ProductsModel.createProduct.restore();
      });

      it('Retorna um objeto com as keys "affectedRows" e "insertId"', async () => {
        const result = await ProductsService.createProduct('Teste123');
        expect(result).to.include.all.keys('affectedRows', 'insertId');
      });

      it('Espera que as chaves "affectedRows" e "insertId" não sejam iguais a 0', async () => {
        const { affectedRows, insertId } = await ProductsService.createProduct('Teste123');
        expect(affectedRows).not.to.be.equal(0);
        expect(insertId).not.to.be.equal(0);
      });
    });
  });
});