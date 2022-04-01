const { expect } = require("chai");
const { describe } = require("mocha");
const sinon = require("sinon");
const productServices = require("../../../services/productServices");
const productControllers = require('../../../controllers/productControllers');
const { fakeProducts, fakeProductObj } = require('../mocks/productMocks');

describe('Executa o controller getAllProducts', () => {
  describe('quando é executado com sucesso', () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {};

      sinon.stub(productServices, 'getAllProducts').resolves(fakeProducts);
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
    });

    after(() => {
      productServices.getAllProducts.restore();
    })

    it('retorna o status com o código 200', async () => {
      await productControllers.getAllProducts(request, response);

      expect(response.status.calledWith(200)).to.be.true;
    });

    it('retorna um json com os dados corretos', async () => {
      await productControllers.getAllProducts(request, response);

      expect(response.json.calledWith(fakeProducts)).to.be.true;
    });
  });

  describe('quando é executado com falha', () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {};

      sinon.stub(productServices, 'getAllProducts').throws();
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
    });

    after(() => {
      productServices.getAllProducts.restore();
    })

    it('retorna o status com o código 500', async () => {
      await productControllers.getAllProducts(request, response);

      expect(response.status.calledWith(500)).to.be.true;
    });

    it('retorna um json com a mensagem de erro', async () => {
      const fakeMessage = { message: 'Server error' };
      await productControllers.getAllProducts(request, response);

      expect(response.json.calledWith(fakeMessage)).to.be.true;
    });
  });
});

describe('Executa o controller getProductById', () => {
  describe('quando é executado com um ID valido', () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {};
      request.params = {};
      const fakeObj = { error: false, code: 200, product: fakeProductObj }

      sinon.stub(productServices, 'getProductById').resolves(fakeObj);
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
    });

    after(() => {
      productServices.getProductById.restore();
    })

    it('retorna o status com o código 200', async () => {
      await productControllers.getProductById(request, response);

      expect(response.status.calledWith(200)).to.be.true;
    });

    it('retorna um json com os dados corretos', async () => {
      await productControllers.getProductById(request, response);

      expect(response.json.calledWith(fakeProductObj)).to.be.true;
    });
  });

  describe('quando é executado com um ID invalido', () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {};
      request.params = {};
      const fakeObj = { error: true, code: 404, message: 'Product not found' }

      sinon.stub(productServices, 'getProductById').resolves(fakeObj);
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
    });

    after(() => {
      productServices.getProductById.restore();
    })

    it('retorna o status com o código 404', async () => {
      await productControllers.getProductById(request, response);

      expect(response.status.calledWith(404)).to.be.true;
    });

    it('retorna um json com a mensagem correta', async () => {
      const fakeMessage = { message: 'Product not found' };
      await productControllers.getProductById(request, response);

      expect(response.json.calledWith(fakeMessage)).to.be.true;
    });
  });

  describe('quando é executado com falha', () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {};
      request.params = {};

      sinon.stub(productServices, 'getProductById').throws();
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
    });

    after(() => {
      productServices.getProductById.restore();
    })

    it('retorna o status com o código 500', async () => {
      await productControllers.getProductById(request, response);

      expect(response.status.calledWith(500)).to.be.true;
    });

    it('retorna um json com a mensagem de erro', async () => {
      const fakeMessage = { message: 'Server error' };
      await productControllers.getProductById(request, response);

      expect(response.json.calledWith(fakeMessage)).to.be.true;
    });
  });
});

describe('Executa o controller createProduct', () => {
  describe('quando é executado com sucesso', () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {};

      sinon.stub(productServices, 'createProduct').resolves(fakeProductObj);
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
    });

    after(() => {
      productServices.createProduct.restore();
    })

    it('retorna o status com o código 201', async () => {
      await productControllers.createProduct(request, response);

      expect(response.status.calledWith(201)).to.be.true;
    });

    it('retorna um json com os dados corretos', async () => {
      await productControllers.createProduct(request, response);

      expect(response.json.calledWith(fakeProductObj)).to.be.true;
    });
  });

  describe('quando é executado com falha', () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {};

      sinon.stub(productServices, 'createProduct').throws();
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
    });

    after(() => {
      productServices.createProduct.restore();
    })

    it('retorna o status com o código 500', async () => {
      await productControllers.createProduct(request, response);

      expect(response.status.calledWith(500)).to.be.true;
    });

    it('retorna um json com a mensagem de erro', async () => {
      const fakeMessage = { message: 'Server error' };
      await productControllers.createProduct(request, response);

      expect(response.json.calledWith(fakeMessage)).to.be.true;
    });
  });
});

describe('Executa o controller updateProduct', () => {
  describe('quando é executado com um ID valido', () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {};
      request.params = {};

      const fakeObj = { error: false, code: 200, productUpdated: fakeProductObj }

      sinon.stub(productServices, 'updateProduct').resolves(fakeObj);
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
    });

    after(() => {
      productServices.updateProduct.restore();
    })

    it('retorna o status com o código 200', async () => {
      await productControllers.updateProduct(request, response);

      expect(response.status.calledWith(200)).to.be.true;
    });

    it('retorna um json com os dados corretos', async () => {
      await productControllers.updateProduct(request, response);

      expect(response.json.calledWith(fakeProductObj)).to.be.true;
    });
  });

  describe('quando é executado com um ID invalido', () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {};
      request.params = {};

      const fakeObj = { error: true, code: 404, message: 'Product not found' }

      sinon.stub(productServices, 'updateProduct').resolves(fakeObj);
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
    });

    after(() => {
      productServices.updateProduct.restore();
    })

    it('retorna o status com o código 404', async () => {
      await productControllers.updateProduct(request, response);

      expect(response.status.calledWith(404)).to.be.true;
    });

    it('retorna um json com a mensagem correta', async () => {
      const fakeMessage = { message: 'Product not found' };
      await productControllers.updateProduct(request, response);

      expect(response.json.calledWith(fakeMessage)).to.be.true;
    });
  });

  describe('quando é executado com falha', () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {};
      request.params = {};

      sinon.stub(productServices, 'updateProduct').throws();
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
    });

    after(() => {
      productServices.updateProduct.restore();
    })

    it('retorna o status com o código 500', async () => {
      await productControllers.updateProduct(request, response);

      expect(response.status.calledWith(500)).to.be.true;
    });

    it('retorna um json com a mensagem de erro', async () => {
      const fakeMessage = { message: 'Server error' };
      await productControllers.updateProduct(request, response);

      expect(response.json.calledWith(fakeMessage)).to.be.true;
    });
  });
});

describe('Executa o controller deleteProduct', () => {
  describe('quando é executado com um ID valido', () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {};
      request.params = {};

      const fakeObj = { error: false, code: 204 }

      sinon.stub(productServices, 'deleteProduct').resolves(fakeObj);
      response.status = sinon.stub().returns(response);
      response.send = sinon.stub().returns();
    });

    after(() => {
      productServices.deleteProduct.restore();
    })

    it('retorna o status com o código 204', async () => {
      await productControllers.deleteProduct(request, response);

      expect(response.status.calledWith(204)).to.be.true;
    });
  });

  describe('quando é executado com um ID invalido', () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {};
      request.params = {};

      const fakeObj = { error: true, code: 404, message: 'Product not found' }

      sinon.stub(productServices, 'deleteProduct').resolves(fakeObj);
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
    });

    after(() => {
      productServices.deleteProduct.restore();
    })

    it('retorna o status com o código 404', async () => {
      await productControllers.deleteProduct(request, response);

      expect(response.status.calledWith(404)).to.be.true;
    });

    it('retorna um json com a mensagem correta', async () => {
      const fakeMessage = { message: 'Product not found' };
      await productControllers.deleteProduct(request, response);

      expect(response.json.calledWith(fakeMessage)).to.be.true;
    });
  });

  describe('quando é executado com falha', () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {};
      request.params = {};

      sinon.stub(productServices, 'deleteProduct').throws();
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
    });

    after(() => {
      productServices.deleteProduct.restore();
    })

    it('retorna o status com o código 500', async () => {
      await productControllers.deleteProduct(request, response);

      expect(response.status.calledWith(500)).to.be.true;
    });

    it('retorna um json com a mensagem de erro', async () => {
      const fakeMessage = { message: 'Server error' };
      await productControllers.deleteProduct(request, response);

      expect(response.json.calledWith(fakeMessage)).to.be.true;
    });
  });
});