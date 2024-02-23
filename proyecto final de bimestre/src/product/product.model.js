import mongoose, { Schema } from "mongoose"


const productSchema =  mongoose.Schema({
 name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
 
  units_available: {
    type: Number,
    required: true
  },

  description: {
    type: String,
    required: true
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'category',
    require: true
  }
}, {
  versionKey: false 
})


// Método estático para obtener todos los productos del catálogo
productSchema.statics.getAllProducts = async function() {
    return await this.find({});
  };

export default mongoose.model('Product', productSchema);
