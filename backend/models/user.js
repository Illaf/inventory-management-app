import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    // Basic Info
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: { type: String, required: true },

    // Role Management
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user'
    },

    // Admin Mapping (only for users)
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
      validate: {
        validator: function (value) {
          // admin field allowed only for users
          if (this.role === 'admin') {
            return value === null;
          }
          return true;
        },
        message: 'Admin users cannot have an admin assigned'
      }
    
    },
    adminChangedAt: {
      type: Date,
      default: null
    },

    // Contact Details
    phone: {
      type: String,
      trim: true,
      match: [/^[0-9]{10}$/, 'Invalid phone number']
    },

    // Address (embedded document)
    address: {
      street: { type: String, trim: true },
      city: { type: String, trim: true },
      state: { type: String, trim: true },
      country: { type: String, trim: true, default: 'India' },
      pincode: {
        type: String,
        match: [/^[0-9]{6}$/, 'Invalid pincode']
      }
    },

    // Inventory / Orders
    products: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }
    ],

    // Account Status
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);


//Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Password matching method
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;
