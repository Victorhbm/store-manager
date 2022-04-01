const { expect } = require("chai");
const { describe } = require("mocha");
const sinon = require("sinon");
const connection = require("../../../models/mysql-connection");
const saleModels = require("../../../models/saleModels");
const { fakeSales, fakeSalesById, fakeSaleProducts } = require('../mocks/saleMocks');

describe('Executa a model getAllSales', () => {
  describe('verifica se a funcao', () => {
    it('retorna os dados corretos', async () => {
      sinon.stub(connection, 'execute').resolves([ fakeSales ]);

      const result = await saleModels.getAllSales();

      expect(result).to.be.equals(fakeSales);

      connection.execute.restore();
    });
  });
});

describe('Executa a model getSaleById', () => {
  describe('verifica se a funcao', () => {
    describe('retorna os dados corretos ao', () => {
      it('passar um ID existente', async () => {
        sinon.stub(connection, 'execute').resolves([ fakeSalesById ]);

        const result = await saleModels.getSaleById(1);
        
        expect(result).to.be.equals(fakeSalesById);

        connection.execute.restore();
      });

      it('passar um ID inexistente', async () => {
        sinon.stub(connection, 'execute').resolves([[]]);

        const result = await saleModels.getSaleById(25);
  
        expect(result).to.be.null;
        
        connection.execute.restore();
      });
    })
  });
});

describe('Executa a model createSale', () => {
  describe('verifica se a funcao', () => {
    it('retorna os dados corretos', async () => {
      const callback = sinon.stub(connection, 'execute');
      callback.onCall(0).resolves([{ insertId: 1 }]);
      callback.onCall(1).resolves();

      const result = await saleModels.createSale(fakeSaleProducts);
      
      expect(result.id).to.be.equals(1);
      expect(result.itemsSold).to.be.equals(fakeSaleProducts);

      connection.execute.restore();
    });
  });
});

describe('Executa a model deleteSale', () => {
  describe('verifica se a funcao', () => {
    it('retorna os dados corretos', async () => {
      sinon.stub(connection, 'execute').resolves();

      await saleModels.deleteSale(1);
      
      expect(connection.execute.called).to.be.true;

      connection.execute.restore();
    });
  });
});