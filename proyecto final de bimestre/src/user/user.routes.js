import express from 'express'
import {validateJwt,isAdmin} from '../middlewares/validate-jwt.js'

import {test, registerUser ,login ,deleteUser, update} from './user.controller.js'

const api = express.Router()

//registrar usuario 
api.post('/register', registerUser)

//Logear el usuario
api.post('/login', login)

//Rutas valida la información admin
api.get('/test', [validateJwt, isAdmin], test)
// Actualiza el usuario
api.put('/updates/:id', [validateJwt], update)
// Eliminar el usuario
api.delete('/deleteUser/:id',[validateJwt], deleteUser)

export default api