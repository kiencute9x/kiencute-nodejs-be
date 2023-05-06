import {userRouter ,studentsRouter} from './routers/index.js'
import {userControllers ,studentControllers} from './controllers/index.js'
import express from 'express'
import dotenv from 'dotenv'
import { print  ,OutputType} from './helpers/print.js'
import checkToken from './authentication/auth.js'
dotenv.config()
import {connect} from './database/db.js'


const _app = express();

const port = process.env.PORT ?? 3000

_app.use(checkToken) // check token middle ware

_app.use(express.json())

_app.use('/users',userRouter)

_app.use('/students',studentsRouter)


_app.get('/index',(_req , _res) =>{
    _res.send('response route router off kien cutes')
})

_app.listen(port, async() => {
    // await disconnectMongo()
    await connect()
    console.log(`listening on port : ${port}`)
})