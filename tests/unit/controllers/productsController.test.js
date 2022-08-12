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
  },
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

const createdProductName = {
  id: 5,
  name: 'Teste123',
};

describe('Testes da Camada de Controller - Products', () => {
  describe('Quando realizar uma busca por todos produtos', () => {
    describe('Quando o produto é encontrado', () => {
      const req = {};
      const res = {};

      beforeEach(async () => {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        sinon.stub(ProductsService, 'getAllProducts').resolves(mockAllProducts);
      });

      afterEach(async () => {
        ProductsService.getAllProducts.restore();
      });

      it('Retorna um status OK 200', async () => {
        await ProductsController.getAllProducts(req, res);
        expect(res.status.calledWith(200)).to.be.equal(true);
      });

      it('Retorna um array com todos os produtos', async () => {
        await ProductsController.getAllProducts(req, res);
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
        sinon.stub(ProductsService, 'getProductByPk').resolves(notFoundByIdProducts);
      });

      afterEach(async () => {
        ProductsService.getProductByPk.restore();
      });

      it('Retorna um status Erro 404', async () => {
        const teste = await ProductsController.getProductByPk(req, res);
        expect(res.status.calledWith(404)).to.be.equal(true);
      });

      it('Uma mensagem é enviada com o texto "Product not found"', async () => {
        await ProductsController.getProductByPk(req, res);
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
        sinon.stub(ProductsService, 'getProductByPk').resolves(mockIdProduct);
      });

      afterEach(async () => {
        ProductsService.getProductByPk.restore();
      });

      it('Retorna um status OK 200', async () => {
        await ProductsController.getProductByPk(req, res);
        expect(res.status.calledWith(200)).to.be.equal(true);
      });

      it('Retorna um produto na função getProductByPk', async () => {
        await ProductsController.getProductByPk(req, res);
        expect(res.json.calledWith(mockIdProduct)).to.be.equal(true);
      });
    });
  });

  describe('Quando eu inserir um produto no banco de dados', () => {
    describe('Quando eu insiro um dado inválido', () => {
      describe('Quando eu não insiro um nome', () => {
        const req = {};
        const res = {};
        beforeEach(async () => {
          req.body = { name: '' };
          res.status = sinon.stub().returns(res);
          res.json = sinon.stub().returns();
          sinon.stub(ProductsService, 'createProduct').resolves(createdProduct);
        });

        afterEach(async () => {
          ProductsService.createProduct.restore();
        });

        it('Retorna um status Error 400', async () => {
          await ProductsController.createProduct(req, res);
          expect(res.status.calledWith(400)).to.be.equal(true);
        });

        it('Uma mensagem é enviada com o texto ""name" is required"', async () => {
          await ProductsController.createProduct(req, res);
          expect(res.json.calledWith({ message: '"name" is required' })).to.be.equal(true);
        });
      });

      describe('Quando eu insiro um nome pequeno', () => {
        const req = {};
        const res = {};
        beforeEach(async () => {
          req.body = { name: 'Tes' };
          res.status = sinon.stub().returns(res);
          res.json = sinon.stub().returns();
          sinon.stub(ProductsService, 'createProduct').resolves(createdProduct);
        });

        afterEach(async () => {
          ProductsService.createProduct.restore();
        });

        it('Retorna um status Error 400', async () => {
          await ProductsController.createProduct(req, res);
          expect(res.status.calledWith(422)).to.be.equal(true);
        });

        it('Uma mensagem é enviada com o texto ""name" length must be at least 5 characters long"', async () => {
          await ProductsController.createProduct(req, res);
          expect(res.json.calledWith({ message: '"name" length must be at least 5 characters long' })).to.be.equal(true);
        });
      });
      
    });

    describe('Quando eu insiro com sucesso', () => {
      const req = {};
      const res = {};
      beforeEach(async () => {
        req.body = { name: 'Teste123' };
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(ProductsService, 'createProduct').resolves(createdProduct);
      });

      afterEach(async () => {
        ProductsService.createProduct.restore();
      });

      it('Retorna um status 201 Created', async () => {
        await ProductsController.createProduct(req, res);
        expect(res.status.calledWith(201)).to.be.equal(true);
      });

      it('Retorna o produto criado corretamente', async () => {
        await ProductsController.createProduct(req, res);
        expect(res.json.calledWith(createdProductName)).to.be.equal(true);
      });
    });
  });
});