import prisma from '../../config/prisma.js';

export const createProduct = async (req, res, next) => {
  try {
    const { productName, type, category, salesPrice, cost } = req.body;

    const product = await prisma.product.create({
      data: {
        productName,
        type,
        category,
        salesPrice,
        cost
      }
    });

    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

export const getProducts = async (req, res, next) => {
  try {
    const { type, category } = req.query;
    const where = {};
    if (type) where.type = type;
    if (category) where.category = category;
    
    const products = await prisma.product.findMany({ where });
    res.json(products);
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: parseInt(req.params.id) }
    });
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { productName, type, category, salesPrice, cost, status } = req.body;

    const product = await prisma.product.update({
      where: { id: parseInt(id) },
      data: {
        productName,
        type,
        category,
        salesPrice,
        cost,
        status
      }
    });
    res.json(product);
  } catch (error) {
    next(error);
  }
};
