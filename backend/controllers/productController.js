import Product from "../models/product.js";

const addProduct = async (req, res) => {
  try {
    const { name,category,categoryId,stock,description,price,supplierId } = req.body;

    if (!name || name.trim() === '') {
      return res.status(400).json({ message: 'Supplier name is required' });
    }

    // Check if category exists (case insensitive)
    let product = await Product.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') } });

    if (product) {
      return res.status(200).json({ message: 'Product already exists', product });
    }

    // Create new category
    const newProduct = await Product.create({ name: name,category,categoryId,stock,description,price,supplierId });
    await newProduct.save();
    return res.status(201).json({ success:true,message: 'Product added successfully', newProduct });

  } catch (err) {
    return res.status(500).json({ success:false,message: 'Server error', err});
  }
};
const getProduct= async(req,res) =>{
    try {
        const products= await Product.find();
        return res.status(200).json({ success:true,message: 'Fetched all products', products });
    } catch (error) {
        return res.status(500).json({ success:false,message: 'Server error', error });
    }
}
const getProductById= async(req,res) =>{
  try {
      const product = await Product.findById(req.params.id);
      return res.status(200).json({ success:true,message: 'Fetched required product', product });
  } catch (error) {
      return res.status(500).json({ success:false,message: 'Server error', error });
  }
}
const updateProduct = async (req, res) => {
  const {name} = req.body;

  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json({ status: false, message: "Product not found" });
  }

  const existing = await Product.findOne({ name });
  if (existing && existing._id.toString() !== req.params.id) {
    return res.status(400).json({ status: false, message: "Product name already in use" });
  }
Object.assign(product,req.body)
  
  const updatedProduct = await product.save();

  res.status(200).json({ status: true, data: updatedProduct });
};
// DELETE /api/categories/:id
const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({ status: false, message: "Product not found" });
  }

  await product.deleteOne();

  res.status(200).json({ status: true, message: "Product deleted successfully" });
};

const getProductListing = async (req, res) => {
  try {
    let { searchTerm, categoryId, page, pageSize, sortBy, sortOrder } = req.query;

    sortBy = sortBy || 'price';
    sortOrder = sortOrder !== undefined ? Number(sortOrder) : -1;
    page = page ? Math.max(1, parseInt(page, 10)) : 1;
    pageSize = pageSize ? Math.max(1, parseInt(pageSize, 10)) : 20;

    const queryFilter = {};

    if (searchTerm) {
      // ✅ Escape regex special characters
      const escaped = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const re = new RegExp(escaped, 'i'); // case-insensitive regex

      queryFilter.$or = [
        { name: { $regex: re } },
        { description: { $regex: re } }
      ];
    }

    if (categoryId) {
      queryFilter.categoryId = categoryId;
    }

    const skip = (page - 1) * pageSize;

    const products = await Product.find(queryFilter)
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(pageSize);

    return res.status(200).json(products.map((x) => x.toObject()));
  } catch (error) {
    console.error('Error in getProductListing:', error);
    return res.status(500).json({ success: false, message: 'Server error', error });
  }
};


export {addProduct, getProduct,updateProduct,deleteProduct,getProductById,getProductListing}
