import { 
  body, 
  validationResult 
} from 'express-validator'
import {userRepo} from '../repositories/index.js'
import {EventEmitter} from 'node:events'
import HttpStatusCode from '../exceptions/HttpCode.js'
import Exception from '../exceptions/Exception.js';

const myEvent = new EventEmitter()
//listen
myEvent.on('event.register.user', (params) => {
  console.log(`They talked about : ${JSON.stringify(params)}`)
})

/// LOGIN USER ///

const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(HttpStatusCode.BAD_REQUEST).json({ 
      errors: errors.array() 
    });
  }
  const { email, password } = req.body;
  try {
    let existingUser = await userRepo.login({email, password})
    res.status(HttpStatusCode.OK).json({
      message: 'Login user successfully',
      data: existingUser
    })
  }catch(exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.toString(),      
    })
  }
}

/// REGISTER USER ///

const register = async (req, res) => { 
  //destructuring
  const {
    name,
    email, 
    password,
    phoneNumber,
    address
  } = req.body
  
  //Event Emitter
  myEvent.emit('event.register.user', {email, phoneNumber})
  try {
    const user = await userRepo.register({    
      name, 
      email,     
      password, 
      phoneNumber, 
      address
    })
    res.status(HttpStatusCode.INSERT_OK).json({
      message: 'Register user successfully',
      data: user
    })
  }catch(exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.toString(),      
    })
  }
  
}


/// GET DETAIL USER ///

const findUserById = async (req, res) => {
  try {
    const user = await userRepo.findUserById(req.params.id);
    if (!user) throw new Error('User not found');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const updateUserById = async (req, res) => {
  try {
    const user = await userRepo.updateById(req.params.id, req.body);
    if (!user) throw new Error('User not found');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteUserById = async (req, res) => {
  try {
    const user = await userRepo.deleteById(req.params.id);
    if (!user) throw new Error('User not found');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default {
    login,
    register,
    findUserById,
    updateUserById,
    deleteUserById
}