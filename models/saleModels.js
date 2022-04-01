const connection = require('./mysql-connection');

const getAllSales = async () => {
  const [sales] = await connection.execute(
    `
    SELECT
      sp.sale_id AS saleId,
      s.date AS date,
      sp.product_id AS productId,
      sp.quantity AS quantity
    FROM StoreManager.sales_products sp
    INNER JOIN StoreManager.sales s
    ON s.id = sp.sale_id
    `,
  );

  return sales;
};

const getSaleById = async (id) => {
  const [sale] = await connection.execute(
    `
    SELECT
      s.date AS date,
      sp.product_id AS productId,
      sp.quantity AS quantity
    FROM StoreManager.sales_products sp
    INNER JOIN StoreManager.sales s
    ON s.id = sp.sale_id
    WHERE s.id = ?
    `,
    [id],
  );

  if (sale.length === 0) return null;

  return sale;
};

const createSale = async (products) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO sales () VALUES ()',
  );

  products.forEach(async ({ productId, quantity }) => {
    await connection.execute(
      `INSERT INTO sales_products (sale_id, product_id, quantity)
      VALUES (?, ?, ?)`,
      [insertId, productId, quantity],
    );
  });

  return {
    id: insertId,
    itemsSold: products,
  };
};

const updateSale = async (id, products) => {
  products.forEach(async ({ productId, quantity }) => {
    await connection.execute(
      `UPDATE sales_products SET product_id = ?, quantity = ?
      WHERE sale_id = ? AND product_id = ?`,
      [productId, quantity, id, productId],
    );
  });

  return {
    saleId: id,
    itemUpdated: products,
  };
};

const deleteSale = async (id) => {
  await connection.execute(
    'DELETE FROM sales_products WHERE sale_id = ?',
    [id],
  );

  await connection.execute(
    'DELETE FROM sales WHERE id = ?',
    [id],
  );
};

module.exports = {
  getAllSales,
  getSaleById,
  createSale,
  updateSale,
  deleteSale,
};
