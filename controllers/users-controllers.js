const { v4: uuidv4 } = require('uuid');
const {validateResult} =require('express-validator');

const HttpError = require('../models/http-error')


const DUMMY_USERS = [
    {
        id:'u1',
        name:'Manju Muthu',
        email:'manjumuthu@gmail.com',
        password:'manjumuthu'
    }
];


const getUsers = (req,res,next) =>{
res.json({users: DUMMY_USERS})
}

const signup = (req,res,next) =>{
    const errors = validationResult(req);

  if(!errors.isEmpty()){
    throw new HttpError('Invalid inputs passed, please check your data.',422);
  }
    const {name , email , password } = req.body;

    const hasUser = DUMMY_USERS.find(user => user.email === email);
    if(hasUser){
        throw new HttpError('Could not create user, email already exists.',422 ); // 422 for invalid user
    }

    const createUser = {
        id:uuidv4(),
        name,
        email,
        password
    };

    DUMMY_USERS.push(createUser);

    res.status(201).json({user : createUser});
};

const login = (req,res,next) => {
    const {email,password} = req.body;

    const identifiedUser = DUMMY_USERS.find(user => user.email === email);

    if(!identifiedUser || identifiedUser.password !== password){
        throw new HttpError('Could not Identify user, Credentials seems to be wrong.',401);
    }

    res.json({message:'Logged in!!!'})
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
