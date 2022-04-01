const { expect } = require("chai");
const { describe } = require("mocha");
const sinon = require("sinon");
const saleModels = require("../../../models/saleModels");
const saleServices = require("../../../services/saleServices");
const { fakeSales, fakeSalesById, fakeSaleProducts, fakeSaleReturn } = require('../mocks/saleMocks');

describe('Executa a service getAllSales', () => {
  describe('verifica se a funcao', () => {
    it('retorna os dados corretos', async () => {
      sinon.stub(saleModels, 'getAllSales').resolves(fakeSales);

      const result = await saleServices.getAllSales();

      expect(result).to.be.equals(fakeSales);

      saleModels.getAllSales.restore();
    });
  });
});

describe('Executa a service getSaleById', () => {
  describe('verifica se a funcao', () => {
    describe('retorna os dados corretos ao', () => {
      it('passar um ID existente', async () => {
        sinon.stub(saleModels, 'getSaleById').resolves(fakeSalesById);

        const result = await saleServices.getSaleById(1);
        
        expect(result.error).to.be.false;
        expect(result.code).to.be.equals(200);
        expect(result.sale).to.be.equals(fakeSalesById);

        saleModels.getSaleById.restore();
      });

      it('passar um ID inexistente', async () => {
        sinon.stub(saleModels, 'getSaleById').resolves(null);

        const result = await saleServices.getSaleById(25);
  
        expect(result.error).to.be.true;
        expect(result.code).to.be.equals(404);
        expect(result.message).to.be.equals('Sale not found');

        saleModels.getSaleById.restore();
      });
    })
  });
});

describe('Executa a service createSale', () => {
  describe('verifica se a funcao', () => {
    it('retorna os dados corretos', async () => {
      sinon.stub(saleModels, 'createSale').resolves(fakeSaleReturn);

      const result = await saleServices.createSale(fakeSaleProducts);
      
      expect(result.id).to.be.equals(1);
      expect(result.itemsSold[0].productId).to.be.equals(1);
      expect(result.itemsSold[0].quantity).to.be.equals(2);
      expect(result.itemsSold[1].productId).to.be.equals(2);
      expect(result.itemsSold[1].quantity).to.be.equals(5);

      saleModels.createSale.restore();
    });
  });
});

describe('Executa a service deleteSale', () => {
  describe('verifica se a funcao retorna os dados corretos ao', () => {
    it('passar um ID existente', async () => {
      sinon.stub(saleModels, 'getSaleById').resolves(fakeSalesById);
      sinon.stub(saleModels, 'deleteSale').resolves();

      const result = await saleServices.deleteSale(1);

      expect(result.error).to.be.false;
      expect(result.code).to.be.equals(204);

      saleModels.getSaleById.restore();
      saleModels.deleteSale.restore();
    });

    it('passar um ID inexistente', async () => {
      sinon.stub(saleModels, 'getSaleById').resolves(null);

      const result = await saleServices.deleteSale(25);

      expect(result.error).to.be.true;
      expect(result.code).to.be.equals(404);
      expect(result.message).to.be.equals('Sale not found');

      saleModels.getSaleById.restore();
    });
  });
});