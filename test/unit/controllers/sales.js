const { expect } = require("chai");
const { describe } = require("mocha");
const sinon = require("sinon");
const saleServices = require("../../../services/saleServices");
const saleControllers = require("../../../controllers/saleControllers");
const {
  fakeSales,
  fakeSalesById,
  fakeSaleProducts,
  fakeSaleReturn,
} = require("../mocks/saleMocks");

describe("Executa o controller getAllSales", () => {
  describe("quando é executado com sucesso", () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {};

      sinon.stub(saleServices, "getAllSales").resolves(fakeSales);
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
    });

    after(() => {
      saleServices.getAllSales.restore();
    });

    it("retorna o status com o código 200", async () => {
      await saleControllers.getAllSales(request, response);

      expect(response.status.calledWith(200)).to.be.true;
    });

    it("retorna um json com os dados corretos", async () => {
      await saleControllers.getAllSales(request, response);

      expect(response.json.calledWith(fakeSales)).to.be.true;
    });
  });

  describe("quando é executado com falha", () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {};

      sinon.stub(saleServices, "getAllSales").throws();
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
    });

    after(() => {
      saleServices.getAllSales.restore();
    });

    it("retorna o status com o código 500", async () => {
      await saleControllers.getAllSales(request, response);

      expect(response.status.calledWith(500)).to.be.true;
    });

    it("retorna um json com a mensagem de erro", async () => {
      const fakeMessage = { message: "Server error" };
      await saleControllers.getAllSales(request, response);

      expect(response.json.calledWith(fakeMessage)).to.be.true;
    });
  });
});

describe('Executa o controller getSaleById', () => {
  describe('quando é executado com um ID valido', () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {};
      request.params = {};
      const fakeObj = { error: false, code: 200, sale: fakeSalesById }

      sinon.stub(saleServices, 'getSaleById').resolves(fakeObj);
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
    });

    after(() => {
      saleServices.getSaleById.restore();
    })

    it('retorna o status com o código 200', async () => {
      await saleControllers.getSaleById(request, response);

      expect(response.status.calledWith(200)).to.be.true;
    });

    it('retorna um json com os dados corretos', async () => {
      await saleControllers.getSaleById(request, response);

      expect(response.json.calledWith(fakeSalesById)).to.be.true;
    });
  });

  describe('quando é executado com um ID invalido', () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {};
      request.params = {};
      const fakeObj = { error: true, code: 404, message: 'Sale not found' }

      sinon.stub(saleServices, 'getSaleById').resolves(fakeObj);
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
    });

    after(() => {
      saleServices.getSaleById.restore();
    })

    it('retorna o status com o código 404', async () => {
      await saleControllers.getSaleById(request, response);

      expect(response.status.calledWith(404)).to.be.true;
    });

    it('retorna um json com a mensagem correta', async () => {
      const fakeMessage = { message: 'Sale not found' };
      await saleControllers.getSaleById(request, response);

      expect(response.json.calledWith(fakeMessage)).to.be.true;
    });
  });

  describe('quando é executado com falha', () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {};
      request.params = {};

      sinon.stub(saleServices, 'getSaleById').throws();
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
    });

    after(() => {
      saleServices.getSaleById.restore();
    })

    it('retorna o status com o código 500', async () => {
      await saleControllers.getSaleById(request, response);

      expect(response.status.calledWith(500)).to.be.true;
    });

    it('retorna um json com a mensagem de erro', async () => {
      const fakeMessage = { message: 'Server error' };
      await saleControllers.getSaleById(request, response);

      expect(response.json.calledWith(fakeMessage)).to.be.true;
    });
  });
});

describe('Executa o controller createSale', () => {
  describe('quando é executado com sucesso', () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {};

      sinon.stub(saleServices, 'createSale').resolves(fakeSaleProducts);
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
    });

    after(() => {
      saleServices.createSale.restore();
    })

    it('retorna o status com o código 201', async () => {
      await saleControllers.createSale(request, response);

      expect(response.status.calledWith(201)).to.be.true;
    });
  });

  describe('quando é executado com falha', () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {};

      sinon.stub(saleServices, 'createSale').throws();
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
    });

    after(() => {
      saleServices.createSale.restore();
    })

    it('retorna o status com o código 500', async () => {
      await saleControllers.createSale(request, response);

      expect(response.status.calledWith(500)).to.be.true;
    });

    it('retorna um json com a mensagem de erro', async () => {
      const fakeMessage = { message: 'Server error' };
      await saleControllers.createSale(request, response);

      expect(response.json.calledWith(fakeMessage)).to.be.true;
    });
  });
});

describe('Executa o controller updatedSale', () => {
  describe('quando é executado corretamente', () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {};
      request.params = {};

      sinon.stub(saleServices, 'updateSale').resolves(fakeSaleReturn);
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
    });

    after(() => {
      saleServices.updateSale.restore();
    })

    it('retorna o status com o código 200', async () => {
      await saleControllers.updateSale(request, response);

      expect(response.status.calledWith(200)).to.be.true;
    });
  });

  describe('quando é executado com falha', () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {};
      request.params = {};

      sinon.stub(saleServices, 'updateSale').throws();
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
    });

    after(() => {
      saleServices.updateSale.restore();
    })

    it('retorna o status com o código 500', async () => {
      await saleControllers.updateSale(request, response);

      expect(response.status.calledWith(500)).to.be.true;
    });

    it('retorna um json com a mensagem de erro', async () => {
      const fakeMessage = { message: 'Server error' };
      await saleControllers.updateSale(request, response);

      expect(response.json.calledWith(fakeMessage)).to.be.true;
    });
  });
});

describe('Executa o controller deleteSale', () => {
  describe('quando é executado com um ID valido', () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {};
      request.params = {};

      const fakeObj = { error: false, code: 204 }

      sinon.stub(saleServices, 'deleteSale').resolves(fakeObj);
      response.status = sinon.stub().returns(response);
      response.send = sinon.stub().returns();
    });

    after(() => {
      saleServices.deleteSale.restore();
    })

    it('retorna o status com o código 204', async () => {
      await saleControllers.deleteSale(request, response);

      expect(response.status.calledWith(204)).to.be.true;
    });
  });

  describe('quando é executado com um ID invalido', () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {};
      request.params = {};

      const fakeObj = { error: true, code: 404, message: 'Sale not found' }

      sinon.stub(saleServices, 'deleteSale').resolves(fakeObj);
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
    });

    after(() => {
      saleServices.deleteSale.restore();
    })

    it('retorna o status com o código 404', async () => {
      await saleControllers.deleteSale(request, response);

      expect(response.status.calledWith(404)).to.be.true;
    });

    it('retorna um json com a mensagem correta', async () => {
      const fakeMessage = { message: 'Sale not found' };
      await saleControllers.deleteSale(request, response);

      expect(response.json.calledWith(fakeMessage)).to.be.true;
    });
  });

  describe('quando é executado com falha', () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {};
      request.params = {};

      sinon.stub(saleServices, 'deleteSale').throws();
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
    });

    after(() => {
      saleServices.deleteSale.restore();
    })

    it('retorna o status com o código 500', async () => {
      await saleControllers.deleteSale(request, response);

      expect(response.status.calledWith(500)).to.be.true;
    });

    it('retorna um json com a mensagem de erro', async () => {
      const fakeMessage = { message: 'Server error' };
      await saleControllers.deleteSale(request, response);

      expect(response.json.calledWith(fakeMessage)).to.be.true;
    });
  });
});