import Category from "../models/category.js";

const addCategory = async (req, res) => {
  try {
    const { name,description } = req.body;

    if (!name || name.trim() === '') {
      return res.status(400).json({ message: 'Category name is required' });
    }

    // Check if category exists (case insensitive)
    let category = await Category.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') } });

    if (category) {
      return res.status(200).json({ message: 'Category already exists', category });
    }

    // Create new category
    const newCategory = await Category.create({ name: name.trim(), description });
    await newCategory.save();
    return res.status(201).json({ success:true,message: 'Category added successfully', newCategory });

  } catch (err) {
    return res.status(500).json({ success:false,message: 'Server error', error: err.message });
  }
};
const getCategory= async(req,res) =>{
    try {
        const categories= await Category.find();
        return res.status(200).json({ success:true,message: 'Fetched all categories', categories });
    } catch (error) {
        return res.status(500).json({ success:false,message: 'Server error', error });
    }
}
const getCategoryById= async(req,res) =>{
  try {
      const category= await Category.findById(req.params.id);
      return res.status(200).json({ success:true,message: 'Fetched required category', category });
  } catch (error) {
      return res.status(500).json({ success:false,message: 'Server error', error });
  }
}
// PUT /api/categories/:id
const updateCategory = async (req, res) => {
  const { name,description } = req.body;

  const category = await Category.findById(req.params.id);
  if (!category) {
    return res.status(404).json({ status: false, message: "Category not found" });
  }

  // Check if name already exists (optional)
  const existing = await Category.findOne({ name });
  if (existing && existing._id.toString() !== req.params.id) {
    return res.status(400).json({ status: false, message: "Category name already in use" });
  }

  category.name = name || category.name;
  category.description= description;
  const updatedCategory = await category.save();

  res.status(200).json({ status: true, data: updatedCategory });
};
// DELETE /api/categories/:id
const deleteCategory = async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return res.status(404).json({ status: false, message: "Category not found" });
  }

  await category.deleteOne();

  res.status(200).json({ status: true, message: "Category deleted successfully" });
};

export {addCategory,getCategory,updateCategory,deleteCategory,getCategoryById}
