const sinon = require('sinon');
const { expect } = require('chai');

const SalesController = require('../../../controllers/SalesController');
const SalesService = require('../../../services/SalesService');

const salesList = [
  {
    "productId": 1,
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 50
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