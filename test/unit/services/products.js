const { expect } = require("chai");
const { describe } = require("mocha");
const sinon = require("sinon");
const productServices = require("../../../services/productServices");
const productModels = require('../../../models/productModels');
const { fakeProducts, fakeProduct, fakeProductObj } = require('../mocks/productMocks');

describe('Executa a service getAllProducts', () => {
  describe('verifica se a funcao', () => {
    it('retorna os dados corretos', async () => {
      sinon.stub(productModels, 'getAllProducts').resolves(fakeProducts);

      const result = await productServices.getAllProducts();
      
      expect(result).to.be.equals(fakeProducts);

      productModels.getAllProducts.restore();
    });
  });
});

describe('Executa a service getProductById', () => {
  describe('verifica se a funcao', () => {
    describe('retorna os dados corretos ao', () => {
      it('passar um ID existente', async () => {
        sinon.stub(productModels, 'getProductById').resolves(fakeProductObj);

        const result = await productServices.getProductById(1);
        
        expect(result.error).to.be.false;
        expect(result.code).to.be.equals(200);
        expect(result.product).to.be.equals(fakeProductObj);

        productModels.getProductById.restore();
      });

      it('passar um ID inexistente', async () => {
        sinon.stub(productModels, 'getProductById').resolves(null);

        const result = await productServices.getProductById(25);
  
        expect(result.error).to.be.true;
        expect(result.code).to.be.equals(404);
        expect(result.message).to.be.equals('Product not found');

        productModels.getProductById.restore();
      });
    })
  });
});

describe('Executa a service createProduct', () => {
  describe('verifica se a funcao', () => {
    it('retorna os dados corretos', async () => {
      const mockObj = { id: 2, name: 'Espada', quantity: 10 }
      sinon.stub(productModels, 'createProduct').resolves(mockObj);

      const result = await productServices.createProduct('Espada', 10);
      
      expect(result.id).to.be.equals(2);
      expect(result.name).to.be.equals('Espada');
      expect(result.quantity).to.be.equals(10);

      productModels.createProduct.restore();
    });
  });
});

describe('Executa a service updateProduct', () => {
  describe('verifica se a funcao retorna os dados corretos ao', () => {
    it('passar um ID inexistente', async () => {
      sinon.stub(productModels, 'getProductById').resolves(null);

      const result = await productServices.updateProduct(25, 'Facao', 15);
      
      expect(result.error).to.be.true;
      expect(result.code).to.be.equals(404);
      expect(result.message).to.be.equals('Product not found');

      productModels.getProductById.restore();
    });

    it('passar um ID existente', async () => {
      const mockObj = { id: 1, name: 'Espada', quantity: 15 }
      sinon.stub(productModels, 'getProductById').resolves(fakeProductObj);
      sinon.stub(productModels, 'updateProduct').resolves(mockObj);

      const result = await productServices.updateProduct(1, 'Espada', 15);
      
      expect(result.error).to.be.false;
      expect(result.code).to.be.equals(200);
      expect(result.productUpdated).to.be.equals(mockObj);

      productModels.getProductById.restore();
      productModels.updateProduct.restore();
    });
  });
});