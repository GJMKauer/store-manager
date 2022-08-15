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

const mockAllSales = [
  {
    "saleId": 1,
    "productId": 1,
    "quantity": 5,
    "date": "2022-08-14T01:01:36.000Z"
  },
  {
    "saleId": 1,
    "productId": 2,
    "quantity": 10,
    "date": "2022-08-14T01:01:36.000Z"
  },
  {
    "saleId": 2,
    "productId": 3,
    "quantity": 15,
    "date": "2022-08-14T01:01:36.000Z"
  }
];

const mockSaleById = [
  {
    "productId": 1,
    "quantity": 5,
    "date": "2022-08-14T01:01:36.000Z"
  },
  {
    "productId": 2,
    "quantity": 10,
    "date": "2022-08-14T01:01:36.000Z"
  }
];

const notFoundByIdSales = [];

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

const mockUpdateSalesControllerReturn = {
  saleId: 1,
  itemsUpdated: salesList,
};

describe('Testes da Camada de Controller - Sales', () => {
  describe('Quando realizar uma busca por todas as vendas', () => {
    describe('Quando a venda é encontrada', () => {
      const req = {};
      const res = {};

      beforeEach(async () => {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        sinon.stub(SalesService, 'getAllSales').resolves(mockAllSales);
      });

      afterEach(async () => {
        SalesService.getAllSales.restore();
      });

      it('Retorna um status OK 200', async () => {
        await SalesController.getAllSales(req, res);
        expect(res.status.calledWith(200)).to.be.equal(true);
      });

      it('Retorna um array com todos os produtos', async () => {
        await SalesController.getAllSales(req, res);
        expect(res.json.calledWith(mockAllSales)).to.be.equal(true);
      });
    });
  });

  describe('Quando realizar uma busca pelo ID', () => {
    describe('Quando a venda não é encontrada', () => {
      const req = {};
      const res = {};

      beforeEach(async () => {
        req.params = { id: 9 };
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(SalesService, 'getSaleByPk').resolves(notFoundByIdSales);
      });

      afterEach(async () => {
        SalesService.getSaleByPk.restore();
      });

      it('Retorna um status Erro 404', async () => {
        await SalesMiddleware.saleValidations(req, res);
        expect(res.status.calledWith(404)).to.be.equal(true);
      });

      it('Uma mensagem é enviada com o texto "Sale not found"', async () => {
        await SalesMiddleware.saleValidations(req, res);
        expect(res.json.calledWith({ message: 'Sale not found' })).to.be.equal(true);
      });
    });

    describe('Quando a venda é encontrada', () => {
      const req = {};
      const res = {};

      beforeEach(async () => {
        req.params = { id: 1 };
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(SalesService, 'getSaleByPk').resolves(mockSaleById);
      });

      afterEach(async () => {
        SalesService.getSaleByPk.restore();
      });

      it('Retorna um status OK 200', async () => {
        await SalesController.getSaleByPk(req, res);
        expect(res.status.calledWith(200)).to.be.equal(true);
      });

      it('Retorna uma venda na função getSaleByPk', async () => {
        await SalesController.getSaleByPk(req, res);
        expect(res.json.calledWith(mockSaleById)).to.be.equal(true);
      });
    });
  });

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

  describe('Ao deletar uma venda no banco de dados', () => {
    describe('Quando eu insiro um dado inválido', () => {
      describe('Quando o id é inválido', () => {
        const req = {};
        const res = {};

        beforeEach(async () => {
          req.params = { id: 9 };
          res.status = sinon.stub().returns(res);
          res.json = sinon.stub().returns();

          sinon.stub(SalesService, 'deleteSale').resolves(mockNewSaleProduct);
        });

        afterEach(async () => {
          SalesService.deleteSale.restore();
        });

        it('Retorna um status Erro 404 Not Found', async () => {
          await SalesMiddleware.saleValidations(req, res);
          expect(res.status.calledWith(404)).to.be.equal(true);
        });

        it('Uma mensagem é enviada com o texto "Sale not found"', async () => {
          await SalesMiddleware.saleValidations(req, res);
          expect(res.json.calledWith({ message: 'Sale not found' })).to.be.equal(true);
        });
      });

      describe('Quando eu insiro com sucesso', () => {
        const req = {};
        const res = {};

        beforeEach(async () => {
          req.params = { id: 1 };
          res.status = sinon.stub().returns(res);
          res.send = sinon.stub().returns();

          sinon.stub(SalesService, 'deleteSale').resolves(mockNewSaleProduct);
        });

        afterEach(async () => {
          SalesService.deleteSale.restore();
        });

        it('Retorna um status HTTP 204', async () => {
          await SalesController.deleteSale(req, res);
          expect(res.status.calledWith(204)).to.be.equal(true);
        });
      });
    });
  });

  describe('Ao atualizar uma venda no banco de dados', () => {
    describe('Quando eu insiro um dado inválido', () => {
      describe('Quando eu não passo o productId', () => {
        const req = {};
        const res = {};

        beforeEach(async () => {
          req.params = { id: 1 };
          req.body = [{ quantity: 0 }];
          res.status = sinon.stub().returns(res);
          res.json = sinon.stub().returns();

          sinon.stub(SalesService, 'updateSale').resolves(mockNewSaleProduct);
        });

        afterEach(async () => {
          SalesService.updateSale.restore();
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
          req.params = { id: 1 };
          req.body = [{ productId: 1 }];
          res.status = sinon.stub().returns(res);
          res.json = sinon.stub().returns();

          sinon.stub(SalesService, 'updateSale').resolves(mockNewSaleProduct);
        });

        afterEach(async () => {
          SalesService.updateSale.restore();
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
          req.params = { id: 1 };
          req.body = [{ productId: 1, quantity: 0 }];
          res.status = sinon.stub().returns(res);
          res.json = sinon.stub().returns();

          sinon.stub(SalesService, 'updateSale').resolves(mockNewSaleProduct);
        });

        afterEach(async () => {
          SalesService.updateSale.restore();
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
          req.params = { id: 1 };
          req.body = [{ productId: 10, quantity: 1 }];
          res.status = sinon.stub().returns(res);
          res.json = sinon.stub().returns();

          sinon.stub(SalesService, 'updateSale').resolves(mockNewSaleProduct);
        });

        afterEach(async () => {
          SalesService.updateSale.restore();
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
        req.params = { id: 1 };
        req.body = salesList;
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        sinon.stub(SalesService, 'updateSale').resolves(mockNewSaleProduct);
      });

      afterEach(async () => {
        SalesService.updateSale.restore();
      });

      it('Retorna um status OK 200', async () => {
        await SalesController.updateSale(req, res);
        expect(res.status.calledWith(200)).to.be.equal(true);
      });

      it('Retorna um objeto com as chaves "id", e "itemsSold", com a chave "itemsSold" sendo um array com todos os produtos', async () => {
        await SalesController.updateSale(req, res);
        expect(res.json.calledWith(mockUpdateSalesControllerReturn)).to.be.equal(true);
      });
    });
  });
});