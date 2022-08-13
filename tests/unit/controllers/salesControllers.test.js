const sinon = require('sinon');
const { expect } = require('chai');

const SalesController = require('../../../controllers/SalesController');
const SalesService = require('../../../services/SalesService');
const SalesMiddleware = require('../../../middlewares/SalesMiddleware');

const salesList = [
  {
    productId: 1,
    quantity: 1
  },
  {
    productId: 2,
    quantity: 50
  },
];

const mockNewSaleProduct = {
  fieldCount: 0,
  affectedRows: 1,
  insertId: 2,
  info: '',
  serverStatus: 2,
  warningStatus: 0
};

const mockSalesControllerReturn = {
  id: 2,
  itemsSold: salesList,
};

describe('Testes da Camada de Services - Sales', () => {
  describe('Ao inserir uma venda no banco de dados', () => {
    describe('Quando eu insiro um dado inválido', () => {
      describe('Quando eu não passo o productId', () => {
        const req = {};
        const res = {};

        beforeEach(async () => {
          req.body = [{ quantity: 0 }];
          res.status = sinon.stub().returns(res);
          res.json = sinon.stub().returns();

          sinon.stub(SalesService, 'createSale').resolves(mockNewSaleProduct);
        });

        afterEach(async () => {
          SalesService.createSale.restore();
        });

        it('Retorna um status Error 400', async () => {
          await SalesMiddleware.productIdValidations(req, res);
          expect(res.status.calledWith(400)).to.be.equal(true);
        });

        it('Uma mensagem é enviada com o texto ""productId" is required"', async () => {
          await SalesMiddleware.productIdValidations(req, res);
          expect(res.json.calledWith({ message: '"productId" is required' })).to.be.equal(true);
        });
      });

      describe('Quando eu não passo o quantity', () => {
        const req = {};
        const res = {};

        beforeEach(async () => {
          req.body = [{ productId: 1 }];
          res.status = sinon.stub().returns(res);
          res.json = sinon.stub().returns();

          sinon.stub(SalesService, 'createSale').resolves(mockNewSaleProduct);
        });

        afterEach(async () => {
          SalesService.createSale.restore();
        });

        it('Retorna um status Error 400', async () => {
          await SalesMiddleware.quantityValidations(req, res);
          expect(res.status.calledWith(400)).to.be.equal(true);
        });

        it('Uma mensagem é enviada com o texto ""quantity" is required"', async () => {
          await SalesMiddleware.quantityValidations(req, res);
          expect(res.json.calledWith({ message: '"quantity" is required' })).to.be.equal(true);
        });
      });

      describe('Quando eu passo uma quantity inválida', () => {
        const req = {};
        const res = {};

        beforeEach(async () => {
          req.body = [{ productId: 1, quantity: 0 }];
          res.status = sinon.stub().returns(res);
          res.json = sinon.stub().returns();

          sinon.stub(SalesService, 'createSale').resolves(mockNewSaleProduct);
        });

        afterEach(async () => {
          SalesService.createSale.restore();
        });

        it('Retorna um status Error 422', async () => {
          await SalesMiddleware.quantityValidations(req, res);
          expect(res.status.calledWith(422)).to.be.equal(true);
        });

        it('Uma mensagem é enviada com o texto ""quantity" must be greater than or equal to 1"', async () => {
          await SalesMiddleware.quantityValidations(req, res);
          expect(res.json.calledWith({ message: '"quantity" must be greater than or equal to 1' })).to.be.equal(true);
        });
      });

      describe('Quando eu passo um productId inválido', () => {
        const req = {};
        const res = {};

        beforeEach(async () => {
          req.body = [{ productId: 10, quantity: 1 }];
          res.status = sinon.stub().returns(res);
          res.json = sinon.stub().returns();

          sinon.stub(SalesService, 'createSale').resolves(mockNewSaleProduct);
        });

        afterEach(async () => {
          SalesService.createSale.restore();
        });

        it('Retorna um status Error 404 Not Found', async () => {
          await SalesMiddleware.productIdValidations(req, res);
          expect(res.status.calledWith(404)).to.be.equal(true);
        });

        it('Uma mensagem é enviada com o texto "Product not found"', async () => {
          await SalesMiddleware.productIdValidations(req, res);
          expect(res.json.calledWith({ message: 'Product not found' })).to.be.equal(true);
        });
      });
    });

    describe('Quando eu insiro com sucesso', () => {
      const req = {};
      const res = {};

      beforeEach(async () => {
        req.body = salesList;
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        sinon.stub(SalesService, 'createSale').resolves(mockNewSaleProduct);
      });

      afterEach(async () => {
        SalesService.createSale.restore();
      });

      it('Retorna um status 201 Created', async () => {
        await SalesController.createSale(req, res);
        expect(res.status.calledWith(201)).to.be.equal(true);
      });

      it('Retorna um objeto com as chaves "id", e "itemsSold", com a chave "itemsSold" sendo um array com todos os produtos', async () => {
        await SalesController.createSale(req, res);
        expect(res.json.calledWith(mockSalesControllerReturn)).to.be.equal(true);
      });
    });
  });
});