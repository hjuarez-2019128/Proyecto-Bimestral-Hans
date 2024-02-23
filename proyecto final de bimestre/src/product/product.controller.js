'use strict'

import Product from './product.model.js'
import { checkUpdate } from '../utils/validator.js'

// Crea el producto
export const createProduct = async (req, res) => {
  try {
    const { name, price, units_available, description, category} = req.body;
    if (!name || !price || !units_available || !description || !category) {
      return res.status(400).send({ message: "All fields are required" });
    }
    // Crear el nuevo producto
    const product = await Product.create({
      name,
      price,
      units_available,
      description,
      category
    });
    res.status(201).json(product);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Obtener un producto unitario por su ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Obtener todos los productos del catálogo
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.getAllProducts();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
// Registrar una venta para ver el inventario
export const registerInventory = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    if (product.units_available < quantity) {
      return res.status(400).json({ message: 'There are not enough units available for this sale' });
    }
    // Actualizar unidades disponibles después de la venta
    product.units_available -= quantity;
    await product.save();
    res.status(200).send({ message: 'Sale registered in inventory successfully' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Eliminar el producto
export const deleteProduct = async (req, res) => {
  try {
    // Obtener el ID del producto de los parámetros de la solicitud
    let { id } = req.params;
    // Eliminar el producto por su ID
    let deletedProduct = await Product.findOneAndDelete({_id: id}) 
    // Verificar si se eliminó correctamente
    if (!deletedProduct) {
      return res.status(404).send({ message: "Product not found and not deleted" });
    }
    // Responder con un mensaje de éxito
    return res.send({ message: `Product with ID ${deletedProduct.name} deleted successfully` });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Error deleting product" });
  }
};

//Ver productos con valor a 0
export const getNoProducts = async(req, res)=>{
  try{
      //ver todos los productos con 0 de stock
      let units = await Product.findOne({units_available: 0});
      if(!units) return res.status(404).send({message: 'NO EXIST'})
      //retornamos todos los productos sin existencia
      return res.send({ units })
  }catch(err){
      console.error(err)
      return res.status(500).send({ message: 'Error getting Products' })

  }
}
// ACTUALIZA EL PRODUCTO
export const update = async (req, res) => {
  try {
      //Capturar la data
      let data = req.body
      //Capturar el id del producto a actualizar
      let { id } = req.params
      //Validar que vengan datos
      let update = checkUpdate(data, false)
      if (!update) return res.status(400).send({ message: 'Have submitted some data that cannot be updated or missing data' })
      //Actualizar
  let updatedProduct = await Product.findOneAndUpdate(
      {_id: id},
      data,
      {new: true}
      ).populate('category', ['name', 'description']) //Eliminar la información sensible
      //Validar la actualización
      if(!updatedProduct) return res.status(404).send({message: 'Product not found and not updated'})
      //Responder si todo sale bien
      return res.send({message: 'Product updated successfully',updatedProduct})
  } catch (err) {
      console.error(err)
      return res.status(500).send({ message: 'Error updating Product' })
  }
}