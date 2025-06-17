import Supplier from "../models/category.js";

const addSupplier = async (req, res) => {
  try {
    const { name,email,phone,address } = req.body;

    if (!name || name.trim() === '') {
      return res.status(400).json({ message: 'Supplier name is required' });
    }

    // Check if category exists (case insensitive)
    let supplier = await Supplier.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') } });

    if (supplier) {
      return res.status(200).json({ message: 'Supplier already exists', supplier });
    }

    // Create new category
    const newSupplier = await Supplier.create({ name: name,email,phone,createdAt: new Date(),address });
    await newSupplier.save();
    return res.status(201).json({ success:true,message: 'Category added successfully', newSupplier });

  } catch (err) {
    return res.status(500).json({ success:false,message: 'Server error', err});
  }
};
const getSupplier= async(req,res) =>{
    try {
        const suppliers= await Supplier.find();
        return res.status(200).json({ success:true,message: 'Fetched all categories', suppliers });
    } catch (error) {
        return res.status(500).json({ success:false,message: 'Server error', error });
    }
}
export {addSupplier,getSupplier}
