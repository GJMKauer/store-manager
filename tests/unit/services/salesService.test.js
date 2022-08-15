const sinon = require('sinon');
const { expect } = require('chai');

const SalesService = require('../../../services/SalesService');
const SalesModel = require('../../../models/SalesModel');
const SalesProductsModel = require('../../../models/SalesProductsModel');

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

describe('Testes da Camada de Services - Sales', () => {
  describe('Quando realizar uma busca por todas as vendas', () => {
    describe('Quando as vendas são encontradas', () => {
      beforeEach(async () => {
        sinon.stub(SalesModel, 'getAllSales').resolves(mockAllSales);
      });

      afterEach(async () => {
        SalesModel.getAllSales.restore();
      });

      it('Retorna um array na função getAllSales', async () => {
        const result = await SalesService.getAllSales();
        expect(result).to.be.an('array');
      });

      it('Retorna todas as vendas', async () => {
        const result = await SalesService.getAllSales();
        expect(result).to.be.equal(mockAllSales);
      });
    });
  });

  describe('Quando realizar uma busca pelo ID', () => {
    describe('Quando a venda não é encontrada', () => {
      beforeEach(async () => {
        sinon.stub(SalesModel, 'getSaleByPk').resolves(notFoundByIdSales);
      });

      afterEach(async () => {
        SalesModel.getSaleByPk.restore();
      });

      it('Retorna um array vazio caso nenhuma venda seja encontrada', async () => {
        const result = await SalesService.getSaleByPk(9);
        expect(result).to.be.equal(notFoundByIdSales);
      });
    });

    describe('Quando a venda é encontrada', () => {
      beforeEach(async () => {
        sinon.stub(SalesModel, 'getSaleByPk').resolves(mockSaleById);
      });

      afterEach(async () => {
        SalesModel.getSaleByPk.restore();
      });

      it('Retorna um array na função getSaleByPk', async () => {
        const result = await SalesService.getSaleByPk(1);
        expect(result).to.be.an('array');
      });

      it('A venda encontrada é o correta', async () => {
        const result = await SalesService.getSaleByPk(1);
        expect(result).to.be.equal(mockSaleById);
      });
    });
  });
  
  describe('Ao inserir uma venda no banco de dados', () => {
    describe('Quando eu insiro com sucesso', () => {
      beforeEach(async () => {
        sinon.stub(SalesProductsModel, 'createSaleProduct').resolves(mockNewSaleProduct);
      });

      afterEach(async () => {
        SalesProductsModel.createSaleProduct.restore();
      });

      it('Retorna um objeto com as keys "affectedRows" e "insertId"', async () => {
        const result = await SalesService.createSale(salesList);
        expect(result).to.include.all.keys('affectedRows', 'insertId');
      });

      it('Espera que as chaves "affectedRows" e "insertId" não sejam iguais a 0', async () => {
        const { affectedRows } = await SalesService.createSale(salesList);
        expect(affectedRows).not.to.be.equal(0);
      });
    });
  });

  describe('Ao deletar uma venda no banco de dados', () => {
    describe('Quando eu insiro com sucesso', () => {
      beforeEach(async () => {
        sinon.stub(SalesModel, 'deleteSale').resolves(mockNewSaleProduct);
      });

      afterEach(async () => {
        SalesModel.deleteSale.restore();
      });

      it('Retorna um objeto com as keys "affectedRows" e "insertId"', async () => {
        const result = await SalesService.deleteSale(salesList);
        expect(result).to.include.all.keys('affectedRows', 'insertId');
      });

      it('Espera que as chaves "affectedRows" e "insertId" não sejam iguais a 0', async () => {
        const { affectedRows } = await SalesService.deleteSale(salesList);
        expect(affectedRows).not.to.be.equal(0);
      });
    });
  });

  describe('Ao atualizar uma venda no banco de dados', () => {
    describe('Quando eu insiro com sucesso', () => {
      beforeEach(async () => {
        sinon.stub(SalesProductsModel, 'updateSaleProduct').resolves(mockNewSaleProduct);
      });

      afterEach(async () => {
        SalesProductsModel.updateSaleProduct.restore();
      });

      it('Retorna um objeto com as keys "affectedRows" e "insertId"', async () => {
        const result = await SalesService.updateSale(salesList);
        expect(result).to.include.all.keys('affectedRows', 'insertId');
      });

      it('Espera que as chaves "affectedRows" e "insertId" não sejam iguais a 0', async () => {
        const { affectedRows } = await SalesService.updateSale(salesList);
        expect(affectedRows).not.to.be.equal(0);
      });
    });
  });
});