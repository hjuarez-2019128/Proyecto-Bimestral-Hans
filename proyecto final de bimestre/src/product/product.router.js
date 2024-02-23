// routes.js

import express from 'express'
const api = express.Router();
import {update, getNoProducts, deleteProduct, registerInventory, createProduct, getAllProducts, getProductById} from './product.controller.js'


//  visualizar el catálogo completo
api.get('/products', getAllProducts);
// Ruta para crear un nuevo producto
api.post('/save', createProduct)
// visualizar tanto productos individuales
api.get('/products/:productId', getProductById);
// llevar un control exhaustivo del inventario
api.post('/inventory', registerInventory );
// ver productos sin existencia
api.get('/getNoProducts', getNoProducts)
//Eliminar productos
api.delete('/delete/:id', deleteProduct)
//Segundo metodo actualizar
api.put('/update/:id', update)
export default api