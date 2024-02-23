import express  from "express";

import {aggregate}from './category.cotroller.js'

const api = express.Router()

api.post('/register',aggregate)

export default api