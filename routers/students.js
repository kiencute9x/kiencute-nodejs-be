import express from 'express'
const routerStudents = express.Router()
import {studentControllers} from '../controllers/index.js'

routerStudents.get('/',studentControllers.getAllStudents)

routerStudents.get('/insert',studentControllers.getStudentById)

routerStudents.put('/:id',studentControllers.updateStudent)

export default routerStudents