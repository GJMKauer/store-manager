const sinon = require('sinon');
const { expect } = require('chai');

const ProductsService = require('../../../services/ProductsService');
const ProductsController = require('../../../controllers/ProductsController');

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

describe('Testes da Camada de Controller - Products', () => {
  describe('Quando realizar uma busca por todos produtos', () => {
    describe('Quando o produto é encontrado', () => {
      const req = {};
      const res = {};

      beforeEach(async () => {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        sinon.stub(ProductsService, 'getAll').resolves(mockAllProducts);
      });

      afterEach(async () => {
        ProductsService.getAll.restore();
      });

      it('Retorna um status OK 200', async () => {
        await ProductsController.getAll(req, res);
        expect(res.status.calledWith(200)).to.be.equal(true);
      });

      it('Retorna um array com todos os produtos', async () => {
        await ProductsController.getAll(req, res);
        expect(res.json.calledWith(mockAllProducts)).to.be.equal(true);
      });
    });
  });

  describe('Quando realizar uma busca pelo ID', () => {
    describe('Quando o produto não é encontrado', () => {
      const req = {};
      const res = {};

      beforeEach(async () => {
        req.params = { id: 9 };
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(ProductsService, 'getByPk').resolves(false);
      });

      afterEach(async () => {
        ProductsService.getByPk.restore();
      });

      it('Retorna um status Erro 404', async () => {
        await ProductsController.getByPk(req, res);
        expect(res.status.calledWith(404)).to.be.equal(true);
      });

      it('Uma mensagem é enviada com o texto "Product not found"', async () => {
        await ProductsController.getByPk(req, res);
        expect(res.json.calledWith({ message: 'Product not found' })).to.be.equal(true);
      });
    });

    describe('Quando o produto é encontrado', () => {
      const req = {};
      const res = {};

      beforeEach(async () => {
        req.params = { id: 1 };
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(ProductsService, 'getByPk').resolves(mockIdProduct);
      });

      afterEach(async () => {
        ProductsService.getByPk.restore();
      });

      it('Retorna um status OK 200', async () => {
        await ProductsController.getByPk(req, res);
        expect(res.status.calledWith(200)).to.be.equal(true);
      });

      it('Retorna um produto na função getByPk', async () => {
        await ProductsController.getByPk(req, res);
        expect(res.json.calledWith(mockIdProduct)).to.be.equal(true);
      });
    });
  })
});